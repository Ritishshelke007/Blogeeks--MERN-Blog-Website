import Embed from "@editorjs/embed";
import Code from "@editorjs/code";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Quote from "@editorjs/quote";
import Header from "@editorjs/header";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import { uploadImage } from "../../common/aws";

const uploadImageByFile = (e) => {
  return uploadImage(e).then((url) => {
    if (url) {
      return {
        success: 1,
        file: { url },
      };
    }
  });
};

const uploadImageByURL = (e) => {
  console.log(e);
  let imgLink = new Promise((resolve, reject) => {
    try {
      console.log("resolved");
      resolve(e);
    } catch (err) {
      console.log("reject");
      reject(err);
    }
  });

  return imgLink.then((url) => {
    console.log(url);
    return {
      success: 1,
      file: { url },
    };
  });
};

export const tools = {
  embed: Embed,
  list: {
    class: List,
    inlineToolbar: true,
  },
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByUrl: uploadImageByURL,
        uploadByFile: uploadImageByFile,
      },
    },
  },
  header: {
    class: Header,
    config: {
      placeholder: "Type Heading...",
      levels: [2, 3],
      defaultLevel: 2,
    },
  },
  quote: Quote,
  marker: Marker,
  inlineCode: InlineCode,
  code: Code,
};
