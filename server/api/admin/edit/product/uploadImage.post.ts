import { readFiles } from 'h3-formidable';
import formidable from "formidable";
import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
    // let imageUrl = ''
    const data = await new Promise((resolve, reject) => {
        const form = formidable({ multiples: true });
        form.parse(event.node.req, (error, fields, files) => {
          if (error) {
            reject(error)
            return
          }
          resolve({ ...fields, ...files })
        //   if (!files.photo) {
        //     resolve({
        //       status: "error",
        //       message: "Please upload a photo with name photo in the form",
        //     });
        //   }
        //   if (files.photo.mimetype.startsWith("image/")) {
        //     const oldPath = files.photo.filepath;
        //     console.log('check passed')
        //     console.log(oldPath)

        //     imageUrl = '/public/images/test.jpg'
        //     resolve({
        //       status: "ok",
        //       url: imageUrl,
        //     });
        //   } else {
        //     resolve({
        //       status: "error",
        //       message: "Please upload nothing but images.",
        //     });
        //   }
        });
      });
      console.log(data)
      
    // const { files: { photo: [ { filepath, mimetype } ] } } = await readFiles(event, {
    //      includeFields: true
    // });
    // console.log('server receive')
    // console.log(filepath)
    // console.log(mimetype)
    // let imageName = String(Date.now()) + String(Math.round(Math.random() * 10000000));
    // let newPath = `${path.join("public", "uploads", imageName)}.${ mimetype.split('/')[1] }`;
    // fs.copyFileSync(filepath, newPath);

    return { success: true }
});