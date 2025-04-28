
import RecordCard from "@/components/RecordCard";
import { useAuthStore } from "@/stores";
import { Message, useChat } from "@ai-sdk/react";
import { fetch as expoFetch } from "expo/fetch";
import { View, TextInput, ScrollView, Text, SafeAreaView } from "react-native";

function renderMessage(message: Message) {
  if (message.role === 'user' || message.id === '1') {
    return <Text>{message.content}</Text>
  }
  if (message.role === 'assistant') {
    const parsedMessage = JSON.parse(message.content);
    // AI 普通文本
    if (parsedMessage.text) {
      return <Text>{parsedMessage.text}</Text>
    }
    return <RecordCard record={parsedMessage.records} />
  }
}

export default function App() {
  const session = useAuthStore(state => state.session);  
  const { messages, error, handleInputChange, input, handleSubmit } = useChat({
    fetch: expoFetch as unknown as typeof globalThis.fetch,
    api: `${process.env.EXPO_PUBLIC_API_URL}/chat`,
    onError: (error) => console.error(error, "ERROR"),
    streamProtocol: 'text',
    body: { user_id: session?.user?.id},
    initialMessages: [{ id: '1', role: 'assistant', content: '你好，我是你的智账（智能记账）助手，有什么可以帮你的吗？'}],
    headers: { 
      'Authorization': `Bearer ${session?.access_token}`
    },
    onFinish: (message, _options) => {
      try {
        const parseMessage = JSON.parse(message.content);
        if (!parseMessage.text) {
          // fet
        }
      } catch (error) {
        
      }
    }
  });


  if (error){
    return <Text className="mt-10">{error.message}</Text>;
  }

  return (
    <SafeAreaView style={{ height: "100%", marginTop: 30 }}>
      <View
        style={{
          height: "95%",
          display: "flex",
          flexDirection: "column",
          paddingHorizontal: 8,
        }}
      >
        <ScrollView style={{ flex: 1 }}>
          {messages.map((m) => (
            <View key={m.id} style={{ marginVertical: 8 }}>
              <View>
                <Text style={{ fontWeight: 700, alignSelf: m.role === 'assistant' ? 'flex-start': 'flex-end' }} className='rounded-xl py-2 px-3 mb-1'>{m.role === 'assistant' ? '智账助手': '我'}</Text>
                <View className={`p-4 rounded-xl ${m.role === 'assistant' ? '': 'bg-slate-200'}`}>{renderMessage(m)}</View>                
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={{ marginTop: 8, marginBottom: 20 }}>
          <TextInput
            style={{ backgroundColor: "white", padding: 8 }}
            placeholder="Say something..."
            value={input}
            onChange={(e) =>
              handleInputChange({
                ...e,
                target: {
                  ...e.target,
                  value: e.nativeEvent.text,
                },
              } as unknown as React.ChangeEvent<HTMLInputElement>)
            }
            onSubmitEditing={(e) => {
              handleSubmit(e);
              e.preventDefault();
            }}
            autoFocus={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
