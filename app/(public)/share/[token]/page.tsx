import { getShareLink } from "@/lib/data/share-link";

const ShareLinkPage = async ({
  params,
}: {
  params: Promise<{ token: string }>;
}) => {
  const { token } = await params;
  const shareLink = await getShareLink({ token });
  /*   console.log({ shareLink });
   */ return <div>ShareLinkPage {token}</div>;
};

export default ShareLinkPage;
