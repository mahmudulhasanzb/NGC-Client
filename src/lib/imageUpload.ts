// lib/imageUpload.js or ts
export const imageUpload = async ({ image }: { image: File }) => {
  // converting the image
  const formData = new FormData();
  formData.append('image', image);

  // posting the image with converted format
  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_KEY}`,
    {
      method: 'POST',
      body: formData,
    },
  );
  const data = await res.json();
  // console.log(data.data)
  return data.data;
};
