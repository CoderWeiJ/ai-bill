import { useEffect, useMemo, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import RecordCard from "@/components/RecordCard";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { create } from "zustand";
import { Session } from "@supabase/supabase-js";
import { useAuthStore } from "@/stores";

interface RecordStore {
  records: Array<{
    id: number;
    createAt: Date;
    title: string;
    amount: number;
    userId: string;
    date: Date;
  }>;
  fetchRecords: (date: Date, session: Session | null) => void;
}

const useRecord = create<RecordStore>((set) => ({
  records: [],
  fetchRecords: (date, session) => {
    if (!session?.user?.id) {
      return;
    }
    console.log(`${process.env.EXPO_PUBLIC_API_URL}/record`);
    const headers = { Authorization: `Bearer ${session?.access_token}` };
    axios
      .post(
        `${process.env.EXPO_PUBLIC_API_URL}/record`,
        { user_id: session.user.id, date: date.toISOString().split("T")[0] },
        { headers }
      )
      .then((res) => {
        set({ records: res.data });
      })
      .catch((error) => {
        console.log("报错了", error);
      });
  },
}));

export default function HomeScreen() {
  const session = useAuthStore((state) => state.session);
  const [date, setDate] = useState(new Date());
  const records = useRecord((state) => state.records);
  const fetchRecords = useRecord((state) => state.fetchRecords);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { income, outcome } = useMemo(() => {
    let income = 0;
    let outcome = 0;
    records.forEach((record) => {
      const amount = record.amount / 100;
      if (amount > 0) {
        income += amount;
      } else {
        outcome += amount;
      }
    });
    return { income, outcome: Math.abs(outcome) };
  }, [records]);

  useEffect(() => {
    fetchRecords(date, session);
  }, [date, session, fetchRecords]);
  return (
    <SafeAreaView className="flex-1 flex gap-4 mx-4 mt-2">
      {/* date */}
      <View className="flex flex-row justify-between">
        <Text className="font-bold">{date.toLocaleDateString()}</Text>
        <Pressable onPress={() => setShowDatePicker(true)}>
          <Text className="text-gray-500">选择日期</Text>
        </Pressable>
      </View>
      {/* date picker */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="inline"
          onChange={(_event, selectedDate) => {
            if (selectedDate) {
              setDate(selectedDate);
              setShowDatePicker(false);
            }
          }}
        ></DateTimePicker>
      )}

      {/* 收入和支出 */}
      <View className="h-1/8 flex flex-row justify-between gap-2">
        <View className="flex-1 bg-green-50 rounded-lg p-4 flex items-center justify-center">
          <View className="w-full flex flex-row justify-between">
            <Text className="font-bold">收入</Text>
            <Text className="text-green-500">{income}</Text>
          </View>
        </View>
        <View className="flex-1 bg-green-50 rounded-lg p-4 flex items-center justify-center">
          <View className="w-full flex flex-row justify-between">
            <Text className="font-bold">支出</Text>
            <Text className="text-red-500">{outcome}</Text>
          </View>
        </View>
      </View>

      {/* 详细记录 */}
      <View className="flex-1 bg-gray-100 rounded-lg py-4 px-1 gap-2">
        <Text className="text-gray-500">详细记录</Text>
        {records.length > 0 && (
          <ScrollView className="flex-1">
            {records.map((record) => {
              return (
                <RecordCard
                  key={record.id}
                  record={{
                    id: record.id,
                    title: record.title,
                    amount: record.amount / 100,
                    createdAt: record.createAt.toString(),
                  }}
                />
              );
            })}
          </ScrollView>
        )}
        {records.length === 0 && <View className="flex-1 flex justify-center items-center">
          <Text className="color-[#111] opacity-50">暂无记录</Text></View>}
      </View>
    </SafeAreaView>
  );
}
