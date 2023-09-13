interface IGoogleMapsSkeleton {
  width: number;
  height: number;
  percent?: boolean;
}

const GoogleMapsSkeleton = ({
  width,
  height,
  percent = false,
}: IGoogleMapsSkeleton) => {
  const tailwindWidth = percent ? `w-[${width}%]` : `w-[${width}px]`;
  const tailwindHeight = percent ? `h-[${height}%]` : `h-[${height}px]`;
  return (
    <div
      role="status"
      className={`flex items-center justify-center ${tailwindHeight} ${tailwindWidth} rounded-lg animate-pulse bg-gray-700`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        id="Capa_1"
        viewBox="0 0 293.334 293.334"
        xmlSpace="preserve"
        className="h-[25%] w-[25%]"
      >
        <g>
          <g>
            <path
              fill="#15212c"
              d="M146.667,0C94.903,0,52.946,41.957,52.946,93.721c0,22.322,7.849,42.789,20.891,58.878    c4.204,5.178,11.237,13.331,14.903,18.906c21.109,32.069,48.19,78.643,56.082,116.864c1.354,6.527,2.986,6.641,4.743,0.212    c5.629-20.609,20.228-65.639,50.377-112.757c3.595-5.619,10.884-13.483,15.409-18.379c6.554-7.098,12.009-15.224,16.154-24.084    c5.651-12.086,8.882-25.466,8.882-39.629C240.387,41.962,198.43,0,146.667,0z M146.667,144.358    c-28.892,0-52.313-23.421-52.313-52.313c0-28.887,23.421-52.307,52.313-52.307s52.313,23.421,52.313,52.307    C198.98,120.938,175.559,144.358,146.667,144.358z"
            />
            <circle fill="#15212c" cx="146.667" cy="90.196" r="21.756" />
          </g>
        </g>
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default GoogleMapsSkeleton;