export function handleApiResponse<T>(response: {
  data?: T;
  error?: { code: string; message: string; reference: string };
}) {
  let contentData: string;

  if (response.error) {
    contentData = JSON.stringify(response.error);
  } else {
    contentData = JSON.stringify(response.data);
  }

  return {
    content: [
      {
        type: "text",
        text: contentData,
      },
    ],
  };
}
