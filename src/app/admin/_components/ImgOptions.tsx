export const ImgBox = ({
  mediaType,
  num,
}: {
  mediaType: string;
  num: string;
}) => {
  return (
    <div className="box-border flex h-64 w-64 items-center justify-center border-4 border-white p-4">
      <h1 className="text-2xl font-bold tracking-tight text-white">
        {mediaType} {num}
      </h1>
    </div>
  );
};

export const ShowImg = ({
  imgUrl,
  altTxt,
}: {
  imgUrl: string;
  altTxt: string;
}) => {
  return (
    <div>
      <img className="h-64 w-64 object-contain" src={imgUrl} alt={altTxt} />
    </div>
  );
};

export const smImg = () => {
  return (
    <div className="box-border flex h-16 w-16 items-center justify-center border-4 border-white bg-gray-400 p-4 hover:bg-gray-500">
      <h1 className="text-2xl font-bold tracking-tight text-white">+</h1>
    </div>
  );
};
