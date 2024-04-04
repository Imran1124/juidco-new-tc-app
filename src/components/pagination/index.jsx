import React from 'react';
import { IconButton, Typography } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const NO_OF_PAGE = [
  {
    id: 0,
    label: '5',
    value: 5
  },
  {
    id: 1,
    label: '10',
    value: 10
  },
  {
    id: 2,
    label: '20',
    value: 20
  },
  {
    id: 3,
    label: '50',
    value: 50
  },
  {
    id: 4,
    label: '100',
    value: 100
  }
];

export default function SimplePagination(props) {
  const next = () => {
    if (props?.page === props?.noOfPage) return;
    props?.setPage(props?.page + 1);
  };

  const prev = () => {
    if (props?.page === 1) return;
    props?.setPage(props?.page - 1);
  };

  return (
    <div className="flex items-center gap-4 mt-2 mb-2 justify-between">
      <div className="flex items-center gap-5">
        <select
          className="border border-gray-300 rounded-md text-gray-900 text-sm p-1.5"
          value={props?.perPage}
          onChange={(e) => {
            props?.setPerPage(parseInt(e.target.value));
            props?.setPage(1);
          }}
        >
          {NO_OF_PAGE?.map((item) => (
            <option key={item.id} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <IconButton
          className="w-7 h-7"
          size="sm"
          variant="outlined"
          onClick={prev}
          disabled={props?.page === 1 || props?.page === 0}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-3 w-3" />
        </IconButton>
        <Typography color="gray" className="font-normal text-sm">
          <strong className="text-gray-900 text-sm">{props?.page}</strong> of{' '}
          <strong className="text-gray-900">{props?.noOfPage}</strong>
        </Typography>
        <IconButton
          className="w-7 h-7"
          size="sm"
          variant="outlined"
          onClick={next}
          disabled={props?.page === props?.noOfPage || props?.page === 0}
        >
          <ArrowRightIcon strokeWidth={2} className="h-3 w-3" />
        </IconButton>
      </div>
    </div>
  );
}
