import Head from "next/head";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Montserrat } from "next/font/google";
import { LinkExternalIcon } from "@primer/octicons-react";
import CountrySelector from "@/components/CountrySelector";
import YearSelector from "@/components/YearSelector";
import Gallery from "@/components/Gallery";
import ToTopButton from "@/components/ToTopButton";
import { WallpaperGroup } from "@/lib/types";

const montserrat = Montserrat({ subsets: ["latin", "latin-ext"], weight: "500" });

const Root = styled.div`
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
`;

const Header = styled.div<{ $backgroundImageUrl: string }>`
  width: 100%;
  height: 60vh;
  color: #fff;
  background-image: url(${ props => props.$backgroundImageUrl });
  background-size: cover;
  background-position: center center;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(192, 192, 192, 0.2);
  backdrop-filter: blur(8px);
`;

const Title = styled.h1`
  font-size: 40px;
  @media (max-width: 700px) {
    & { font-size: 32px; }
  }
`;

const SubTitle = styled.span`
  margin-top: 4px;
  font-size: 14px;
  color: #ddd;
`;

const MenuContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 700px) {
    & {
      top: 12px;
      right: 12px;
    }
  }
`;

const RepoLink = styled.a`
  margin-left: 4px;
  padding: 8px;
  cursor: pointer;
  border-radius: 6px;
  color: #fff;
  text-decoration: none;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 700px) {
    & { font-size: 14px; }
  }
`;

const ExternalIcon = styled(LinkExternalIcon)`
  transform: translate(1px, -2px);
`;

const Main = styled.div`
  width: 100%;
  padding: 0 48px 96px 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Index() {
  const [isHeaderReadyToShow, setIsHeaderReadyToShow] = useState(false);
  const [headerBackgroundImageUrl, setHeaderBackgroundImageUrl] = useState('');
  const [currentCountry, setCurrentCountry] = useState('Global');
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear().toString());
  const [wallpaperData, setWallpaperData] = useState<WallpaperGroup[]>([]);
  
  useEffect(() => {
    const isIdExistInUrl = new URLSearchParams(window.location.search).get('id') !== null;
    if (isIdExistInUrl) {
      window.history.replaceState({}, '', '/');
      window.location.reload();
    }
  }, []);
  
  useEffect(() => {
    // clear wallpaper first
    setWallpaperData([]);
    
    // fetch new data from API
    (async () => {
      const apiUrl = `${location.protocol}//${location.hostname}:23457/api/getWallpapers?${new URLSearchParams({ country: currentCountry, year: currentYear })}`;
      const apiResponse = await fetch(apiUrl).then(res => res.json());
      setWallpaperData(apiResponse.data);

      for (const wallpaperDetail of apiResponse.data[0].data) {
        const wallpaperUrl = `https://bing.com/th?id=${wallpaperDetail.id}_320x240.jpg`;
        const isFileExist = await fetch(wallpaperUrl).then(res => res.status === 200);
        if (isFileExist) {
          setHeaderBackgroundImageUrl(wallpaperUrl);
          setIsHeaderReadyToShow(true);
          break;
        }
      }
    })();
  }, [currentCountry, currentYear]);

  return (
    <>
      <Head>
        <title>BING GALLERY</title>
        <meta name="description" content="BING GALLERY" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons/favicon.png" />
      </Head>
      <Root className={montserrat.className}>
        {
          isHeaderReadyToShow && (
            <Header $backgroundImageUrl={headerBackgroundImageUrl}>
              <TitleContainer>
                <Title>BING · GALLERY</Title>
                <SubTitle>Bing wallpaper everyday</SubTitle>
              </TitleContainer>
              <MenuContainer>
                <CountrySelector selectOnChangeHandler={setCurrentCountry} />
                <YearSelector selectOnChangeHandler={setCurrentYear} />
                <RepoLink href="https://github.com/Timesient/bing-gallery" target="_blank" rel="noopener noreferrer">Github<ExternalIcon size={14}/></RepoLink>
              </MenuContainer>
            </Header>
          )
        }
        <Main>
          { wallpaperData.length ? <Gallery wallpaperData={wallpaperData} /> : <></> }
        </Main>
        <ToTopButton />
      </Root>
    </>
  );
}
