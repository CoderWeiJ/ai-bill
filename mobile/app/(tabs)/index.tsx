import { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import RecordCard from "@/components/RecordCard";

import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
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
            <Text className="text-green-500">1005</Text>
          </View>
        </View>
        <View className="flex-1 bg-green-50 rounded-lg p-4 flex items-center justify-center">
          <View className="w-full flex flex-row justify-between">
            <Text className="font-bold">支出</Text>
            <Text className="text-red-500">500</Text>
          </View>
        </View>
      </View>

      {/* 详细记录 */}
      <View className="flex-1 bg-gray-100 rounded-lg py-4 px-1 gap-2">
        <Text className="text-gray-500">详细记录</Text>
        <ScrollView className="flex-1">
          <RecordCard
            record={{
              id: 1,
              title: "收入",
              amount: 1000,
              createdAt: "2025-04-22",
            }}
          ></RecordCard>
          <RecordCard
            record={{
              id: 1,
              title: "支出",
              amount: -1000,
              createdAt: "2025-04-20",
            }}
          ></RecordCard>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
