'use client';
import React from 'react';

export type SubCategory = {
  id: string;
  attributes: {
    name: string;
    displayName: string;
    slug: string;
  };
};

interface ISubCategories {
  subCategories: SubCategory[];
}

const SubCategories = ({ subCategories }: ISubCategories) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [isSelectOpen, setIsSelectOpen] = React.useState(false);

  const toggleOption = (slug: string) => {
    if (selectedOptions.includes(slug)) {
      setSelectedOptions(
        selectedOptions.filter(
          (selectedOptionSlug) => selectedOptionSlug !== slug,
        ),
      );
    } else setSelectedOptions([...selectedOptions, slug]);
  };

  const handleSelectClick = () => setIsSelectOpen(!isSelectOpen);

  React.useEffect(() => {
    console.log(isSelectOpen);
  }, [isSelectOpen]);

  return (
    <React.Fragment>
      <div
        className="relative w-1/2 flex"
        onMouseOver={() => setIsSelectOpen(true)}
      >
        <div
          className={`w-full h-full p-2 cursor-pointer ${
            isSelectOpen ? 'bg-white' : 'bg-transparent'
          } ${
            !isSelectOpen && selectedOptions.length < 1
              ? 'bg-slate-50 border border-dashed border-slate-200 rounded-3xl'
              : ''
          }`}
          onClick={handleSelectClick}
        >
          {!isSelectOpen && selectedOptions.length < 1 ? (
            <div className="w-full h-full flex justify-center items-center">
              <p className="text-sm text-slate-400">
                Selecionar sub-categorias
              </p>
            </div>
          ) : (
            ''
          )}
          {selectedOptions.map((value) => (
            <span
              key={value}
              className="inline-flex items-center justify-center bg-primary/30 rounded-full px-2.5 py-0.5 text-primary/90 m-1"
            >
              <p className="whitespace-nowrap text-sm">
                {
                  subCategories.find(
                    ({ attributes }) => attributes.slug === value,
                  )?.attributes.displayName
                }
              </p>
              <button
                onClick={() => toggleOption(value)}
                className="ml-1 rounded-full bg-primary/40 p-0.5 text-primary/90 hover:bg-primary/60"
              >
                <span className="sr-only">Remove badge</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-3 w-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </span>
          ))}
        </div>
        {/* SELECT */}
        {isSelectOpen && (
          <select
            className="absolute left-0 w-full h-full flex flex-row flex-wrap bg-transparent cursor-pointer overflow-y-auto scrollbar-none"
            multiple
            value={selectedOptions}
            onChange={(e) => toggleOption(e.target.value)}
            onMouseLeave={() => setIsSelectOpen(false)}
          >
            {subCategories.map(({ id, attributes: { displayName, slug } }) => {
              const selected = selectedOptions.includes(slug);
              return (
                <option
                  key={id}
                  value={slug}
                  selected={selected}
                  className={`w-full inline-flex items-center justify-center px-2.5 py-0.5 m-1 ${
                    selected ? '!hidden' : ''
                  }`}
                >
                  <p className="whitespace-nowrap text-sm">{displayName}</p>
                </option>
              );
            })}
          </select>
        )}
      </div>
    </React.Fragment>
  );
};

export default SubCategories;

// <React.Fragment>
//   <select className="w-full h-full" multiple>
//     {subCategories.map(({ id, attributes: { displayName } }) => (
//       <span
//         key={id}
//         className="m-1 inline-flex items-center justify-center rounded-full bg-primary/30 px-2.5 py-0.5 text-primary/90"
//       >
//         <p className="whitespace-nowrap text-sm">{displayName}</p>

//         <button className="-me-1 ms-1.5 inline-block rounded-full bg-primary/40 p-0.5 text-primary/90 transition hover:bg-primary/60">
//           <span className="sr-only">Remove badge</span>

//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="1.5"
//             stroke="currentColor"
//             className="h-3 w-3"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>
//       </span>
//     ))}
//   </select>
// </React.Fragment>
