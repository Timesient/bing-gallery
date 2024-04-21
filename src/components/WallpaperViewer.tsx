import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
import { XIcon, DownloadIcon, LinkExternalIcon } from "@primer/octicons-react";
import { WallpaperDetail } from "@/lib/types";
import LoadingCircle from "./LoadingCircle";

const Root = styled.div<{ $backgroundImageUrl: string }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #111;
  background-image: url(${ props => props.$backgroundImageUrl });
  background-size: cover;
  background-position: center center;
  animation: fadeIn 0.1s;
`;

const WhiteLoadingCircle = styled(LoadingCircle)`
  margin-top: 0;
  border: 2px solid #fff;
  border-top-color: rgba(255, 255, 255, 0.2);
  border-right-color: rgba(255, 255, 255, 0.2);
  border-bottom-color: rgba(255, 255, 255, 0.2);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 96px;
  height: 48px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  transition: background-color 0.15s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 700px) {
    & {
      top: 12px;
      left: 12px;
      width: 72px;
      height: 36px;
    }
  }
`;

const DownloadButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 96px;
  height: 48px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  transition: background-color 0.15s;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }

  @media (max-width: 700px) {
    & {
      top: 12px;
      right: 12px;
      width: 72px;
      height: 36px;
    }
  }
`;

const DetailContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 20px;
  width: 100%;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);

  @media (max-width: 700px) {
    & { padding: 12px; }
  }
`;

const DetailTitle = styled.p`
  margin-bottom: 8px;
  font-size: 20px;

  @media (max-width: 700px) {
    & { font-size: 16px; }
  }
`;

const DetailContent = styled.p`
  font-size: 14px;
  color: #ccc;
  @media (max-width: 700px) {
    & { font-size: 12px; }
  }
`;

const KnowMoreLink = styled.a`
  display: inline-block;
  color: #00BFFF;
  text-decoration: underline;
  word-break: keep-all;
`;

export default function WallpaperViewer({
  data,
  wallpaperViewerCloseHandler
}: {
  data: WallpaperDetail,
  wallpaperViewerCloseHandler: Function
}) {
  const [backgroundImageArrayBuffer, setBackgroundImageArrayBuffer] = useState<ArrayBuffer>();
  const [isDownloadButtonClicked, setIsDownloadButtonClicked] = useState(false);
  const closeWallpaperViewer = useCallback(() => {
    window.history.replaceState({}, '', '/');
    window.history.back();
    wallpaperViewerCloseHandler();
  }, [wallpaperViewerCloseHandler]);

  // push history state when wallpaper viewer opened 
  useEffect(() => {
    window.history.pushState({}, "", `?id=${data.id}`);

    window.addEventListener('popstate', closeWallpaperViewer, true);

    return () => window.removeEventListener('popstate', closeWallpaperViewer, true);
  }, [data.id, closeWallpaperViewer]);

  // fetch background image
  useEffect(() => {
    fetch(`https://bing.com/th?id=${data.id}_UHD.jpg`)
      .then(res => res.arrayBuffer())
      .then(arraybuffer => setBackgroundImageArrayBuffer(arraybuffer))
      .catch(err => console.log(err));
  }, [data.id]);

  // download image
  useEffect(() => {
    if (!isDownloadButtonClicked || !backgroundImageArrayBuffer) return;

    // download image file with given file name
    const a = document.createElement('a');
    a.href = 'data:image/jpg;base64,' + window.btoa(new Uint8Array(backgroundImageArrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
    a.download = `${data.title}${data.copyright.replace('© ', '©').replace('/', '@')}_${data.id.replace('OHR.', '')}.jpg`;
    a.click();

    setIsDownloadButtonClicked(false);
  }, [data, isDownloadButtonClicked, backgroundImageArrayBuffer]);

  return (
    <Root $backgroundImageUrl={ backgroundImageArrayBuffer ? `https://bing.com/th?id=${data.id}_UHD.jpg` : ''}>
      <CloseButton onClick={closeWallpaperViewer}><XIcon size={20} /></CloseButton>
      <DetailContainer>
        <DetailTitle>{`${data.title} ${data.copyright}`}</DetailTitle>
        <DetailContent>
          {data.description}
          &nbsp;&nbsp;
          <KnowMoreLink href={data.knowMoreURL} target="_blank" rel="noopener noreferrer">Know More<LinkExternalIcon size={14} /></KnowMoreLink>
        </DetailContent>
      </DetailContainer>
      {
        backgroundImageArrayBuffer 
        ? <DownloadButton onClick={() => setIsDownloadButtonClicked(true)}><DownloadIcon size={20} /></DownloadButton>
        : <WhiteLoadingCircle />
      }
    </Root>
  )
}