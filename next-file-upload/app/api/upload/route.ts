// Import necessary modules
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

// Define the POST handler for the file upload
export const POST = async (req: any, res: any) => {
  // Parse the incoming form data
  const formData = await req.formData();

  // Get the file from the form data
  const file = formData.get('file');

  // Check if a file is received
  if (!file) {
    // If no file is received, return a JSON response with an error and a 400 status code
    return NextResponse.json({ error: 'No files received.' }, { status: 400 });
  }

  // Convert the file data to a Buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // Replace spaces in the file name with underscores
  const filename = file.name.replaceAll(' ', '_');
  console.log(filename);

  try {
    // Write the file to the specified directory (public/assets) with the modified filename
    await writeFile(path.join(process.cwd(), 'public/uploads/' + filename), buffer);
    // Return a JSON response with a success message and a 200 status code
    return NextResponse.json({ message: 'Success', status: 200, path: '/uploads/' + filename });
  } catch (error) {
    // If an error occurs during file writing, log the error and return a JSON response with a failure message and a 500 status code
    console.log('Error occurred ', error);
    return NextResponse.json({ message: 'Failed', status: 500 });
  }
};
