// import multer from "multer";
// import { CloudinaryStorage } from 'multer-storage-cloudinary'


// // export const storage = multer.diskStorage({
// //     destination: function (req, file, cb) {
// //         cb(null, '../Client/public')
// //     },
// //     filename: function (req, file, cb) {
// //         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
// //         cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
// //     }
// // })

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         // cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
//         folder: 'some-folder-name',
//         format: async (req, file) => 'png', // supports promises as well
//         public_id: (req, file) => 'computed-filename-using-request',
//     },
// });

// export const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith("image/")) {
//         cb(null, true);
//     } else {
//         cb(new Error("Only image files are allowed!"), false);
//     }
// };
