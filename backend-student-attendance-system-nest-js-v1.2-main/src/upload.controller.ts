const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

const client = new S3Client({
    region: "default",
	endpoint: process.env.LIARA_ENDPOINT,
	credentials: {
		accessKeyId: process.env.LIARA_ACCESS_KEY,
		secretAccessKey: process.env.LIARA_SECRET_KEY
	},
});

const uploadFile = async (file) => {
    try {
        const params = {
            Body: file,
            Bucket: process.env.LIARA_BUCKET_NAME,
            Key: file.name, // اینجا می‌توانید نام دلخواهی برای فایل خود تعیین کنید
        };

        // async/await
        const data = await client.send(new PutObjectCommand(params));
        console.log(data);

        // callback
        // client.send(new PutObjectCommand(params), (error, data) => {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log(data);
        //     }
        // });
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};

// مثال استفاده از فانکشن آپلود فایل
const file = "<Binary String>"; // اینجا باید رشته دودویی فایل خود را قرار دهید
uploadFile(file);
