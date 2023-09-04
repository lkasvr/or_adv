import React from 'react';

const Card = () => {
  return (
    <article className="group">
      <img
        alt="Lava"
        src="https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
      />

      <div className="p-4">
        <a href="#">
          <h3 className="text-lg font-medium text-gray-900">
            Finding the Journey to Mordor
          </h3>
        </a>

        <p className="mt-2 ml-2 line-clamp-3 text-sm/relaxed text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
          dolores, possimus pariatur animi temporibus nesciunt praesentium
          dolore sed nulla ipsum eveniet corporis quidem, mollitia itaque minus
          soluta, voluptates neque explicabo tempora nisi culpa eius atque
          dignissimos. Molestias explicabo corporis voluptatem?
        </p>

        <a
          href="#"
          className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary"
        >
          Find out more
          <span
            aria-hidden="true"
            className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
          >
            &rarr;
          </span>
        </a>
      </div>

      <hr className="mt-1 mb-6 h-[1px] w-full text-gray-400" />
    </article>
  );
};

export default Card;
