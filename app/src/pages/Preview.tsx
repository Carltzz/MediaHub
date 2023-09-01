import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useAppContext } from "../ApplicationContext";

const previewBackground: { [key: string]: string } = {
  youtube: '/img/preview/youtube.jpg',
  soundcloud: '/img/preview/soundcloud.jpg'
};

const Preview = () => {
  const { platform, link } = useParams();
  const { setAppState } = useAppContext();

  useEffect(() => {
    setAppState(prevState => ({
      ...prevState,
      menuBarHidden: false,
      menuSelectedIndex: 1
    }));
  }, [setAppState]);

  if (!platform) {
    return <>Something went wrong.</>
  }

  const bgUrl = previewBackground[platform];
  const style = {
    backgroundImage: `url(${bgUrl})`
  };

  return (
    <div className="preview-screen" style={style}>
      Hi {link}
    </div>
  )
}

export default Preview;
