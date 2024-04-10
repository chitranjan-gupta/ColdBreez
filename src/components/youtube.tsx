export default function Youtube({ url }: { url: string }) {
  // youtube url 1 https://www.youtube-nocookie.com/embed/n91tLiPR60Q?si=1MRsbabY_WDgTj7E
  // youtube url 2 https://www.youtube.com/embed/n91tLiPR60Q?si=0BVZ6BDhTBTydNbx
  return (
    <div className="w-[560px] h-[315px]">
      <iframe
        width="560"
        height="315"
        src={url}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}
