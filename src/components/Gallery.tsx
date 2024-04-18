import { useState, useEffect, useRef, Key } from "react";
import styled from "styled-components";
import { WallpaperDetail, WallpaperGroup } from "@/lib/types";
import LoadingCircle from "./LoadingCircle";
import WallpaperViewer from "./WallpaperViewer";

const Root = styled.div`
  position: relative;
  padding-bottom: 120px;
  width: 100%;
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WallpaperGroupContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WallpaperGroupTitle = styled.span`
  margin: 72px 0;
  padding: 8px 24px;
  font-size: 36px;
  border-bottom: 3px solid #000;

  @media (prefers-color-scheme: dark) {
    & { border-bottom-color: #fff; }
  }

  @media (max-width: 700px) {
    & {
      margin: 36px 0;
      padding: 4px 12px;
      font-size: 24px;
      border-bottom: 2px solid #000;
    }
  }
`;

const WallpaperGroupContent = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 320px);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  justify-content: center;
`;

const WallpaperCard = styled.div<{ $thumbnailUrl: string }>`
  position: relative;
  width: 320px;
  height: 180px;
  background-image: url(${ props => props.$thumbnailUrl });
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  overflow: hidden;

  &:hover div {
    bottom: 0;
  }
`;

const WallpaperCardHeadline = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 8px;
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 14px;
  background-color: rgba(0, 0, 0, 0.5);
  transition: bottom 0.15s;

  @media (hover: hover) and (pointer: fine) {
    & { bottom: -36px; }
  }
`;

const BottomText = styled.span`
  position: absolute;
  bottom: 0;
  font-size: 20px;
  color: #aaa;

  @media (max-width: 700px) {
    & { font-size: 14px; }
  }
`;

export default function Gallery({
  wallpaperData
}: {
  wallpaperData: WallpaperGroup[]
}) {
  const [thumbnailRes, setThumbnailRes] = useState<string>('320x240');
  const [checkedWallpaperData, setCheckedWallpaperData] = useState<WallpaperGroup[]>([]);
  const [nextIndexToCheck, setNextIndexToCheck] = useState(0);
  const [wallpaperViewerData, setWallpaperViewerData] = useState<WallpaperDetail>();
  const loadingCircleRef = useRef(null);

  // use higher resolution thumbnail on mobile device
  useEffect(() => {
    if (window.innerWidth < 700) setThumbnailRes('800x480');
  }, []);

  // setup intersection observer for 'BottomText' element
  useEffect(() => {
    async function observeCallback(entries: IntersectionObserverEntry[]) {
      if (!entries[0].isIntersecting) return;
      if (nextIndexToCheck >= wallpaperData.length) return;

      // check target group
      const targetGroup = wallpaperData[nextIndexToCheck];
      const checkedData: WallpaperDetail[] = [];
      for (let index = 0; index < targetGroup.data.length; index += 6) {
        const from = index;
        const to = Math.min(index + 6, targetGroup.data.length);
        await Promise.all(targetGroup.data.slice(from, to).map(wallpaper => 
          fetch(`https://bing.com/th?id=${wallpaper.id}_${thumbnailRes}.jpg`)
            .then(res => res.status === 200 && checkedData.push(wallpaper))
            .catch(err => console.log(err))
        ))
      }

      // generate checked group
      checkedData.sort((a, b) => b.timestamp - a.timestamp);
      const checkedGroup =  { month: targetGroup.month, data: checkedData };

      // update checked wallpaper data
      setCheckedWallpaperData(checkedWallpaperData.concat(checkedGroup));
      setNextIndexToCheck(nextIndexToCheck + 1);
    }

    const options = { rootMargin: "0px 0px 800px 0px" };
    const io = new IntersectionObserver(observeCallback, options);
    const loadingCircleElement = loadingCircleRef.current;
    if (loadingCircleElement) io.observe(loadingCircleElement);

    return () => {
      if (loadingCircleElement) io.disconnect();
    }
  }, [wallpaperData, nextIndexToCheck, checkedWallpaperData, thumbnailRes]);

  // disable scroll when wallpaper viewer appearing
  useEffect(() => {
    if (wallpaperViewerData) document.body.classList.add('scroll-disabled');
    else document.body.classList.remove('scroll-disabled');
  }, [wallpaperViewerData]);

  return (
    <Root>
      {
        checkedWallpaperData.map((group: any, groupIndex: Key) => (
          <WallpaperGroupContainer key={groupIndex}>
            <WallpaperGroupTitle>{group.month}</WallpaperGroupTitle>
            <WallpaperGroupContent>
              {
                group.data.map((data: any, dataIndex: Key) => (
                  <WallpaperCard
                    key={dataIndex}
                    $thumbnailUrl={`https://bing.com/th?id=${data.id}_${thumbnailRes}.jpg`}
                    onClick={() => setWallpaperViewerData(data)}
                  >
                    <WallpaperCardHeadline>{data.headline}</WallpaperCardHeadline>
                  </WallpaperCard>
                ))
              }
            </WallpaperGroupContent>
          </WallpaperGroupContainer>
        ))
      }
      {
        nextIndexToCheck < wallpaperData.length
        ? <LoadingCircle ref={loadingCircleRef} />
        : <BottomText>All images have been loaded.</BottomText>
      }
      { wallpaperViewerData && <WallpaperViewer data={wallpaperViewerData} wallpaperViewerCloseHandler={setWallpaperViewerData} />}
    </Root>
  );
}