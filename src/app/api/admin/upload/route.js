import { verifyAdminAuth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_APT_SECRET || process.env.CLOUD_API_SECRET,
});

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'anmol_graphics' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
};

export async function POST(req) {
  try {
    const isAuth = await verifyAdminAuth();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const files = formData.getAll('files');

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    const fileUrls = [];

    for (const file of files) {
      if (typeof file === 'string') continue; // Skip if it's just a text input

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload buffer directly to Cloudinary
      const result = await uploadToCloudinary(buffer);
      fileUrls.push(result.secure_url);
    }

    return NextResponse.json({ success: true, urls: fileUrls });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
