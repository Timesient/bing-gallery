import { useRouter } from 'next/router';
import { getCertainImageData } from '../../lib/getImageData';
import { resolutionConfig, getCountryCodeByID } from '../../lib/preset';
import ImageViewer from '../../components/ImageViewer/ImageViewer';

export async function getServerSideProps(context) {
  const id = context.query.id;
  const countryCode = getCountryCodeByID(id);
  const imageContent = getCertainImageData(id, resolutionConfig, countryCode);

  return {
    props: {
      imageContent,
    }
  }
}

export default function Detail({ imageContent })  {
  const router = useRouter();

  return <ImageViewer imageContent={imageContent} onClose={() => router.push('/')} />
}