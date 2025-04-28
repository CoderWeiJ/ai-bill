
export function parseResult(result: string): Record<string, any> | null {
  try {
    // 清理一下可能存在的 Markdown 格式
    const cleanResult = result.replace(/```json\n/, '').replace(/\n```/, '').trim();
    const parseJson = JSON.parse(cleanResult);

    if (parseJson?.amount != null && parseJson?.title != null && parseJson?.date != null) {
      return parseJson;
    }
    return null;
    
  } catch (error) {
    // console.error('[parseResult Failed]', error)
    return null;
  }
}