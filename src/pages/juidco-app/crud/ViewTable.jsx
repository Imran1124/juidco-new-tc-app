import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  PencilIcon,
  UserPlusIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/react/24/solid';
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  IconButton,
  Tooltip
} from '@material-tailwind/react';

export default function ViewTable(props) {
  return (
    <div>
      <table className="mt-4 w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {props?.tableHead?.map((head) => (
              <th
                key={head}
                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props?.data?.map((item, index) => {
            const isLast = index === props?.data?.length - 1;
            const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

            return (
              <tr key={index}>
                {props?.fields?.map((field, index1) => {
                  return (
                    <td className={classes} key={index1}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {item[field]}
                          </Typography>
                        </div>
                      </div>
                    </td>
                  );
                })}

                {/* if status then? */}

                {props?.status && (
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={item['status'] === 1 ? 'Active' : 'Inactive'}
                        color={item['status'] === 1 ? 'green' : 'red'}
                      />
                    </div>
                  </td>
                )}

                {/* if edit  */}
                {props?.edit && (
                  <td className={classes}>
                    <Tooltip
                      content="Edit User"
                      className="text-[11px] bg-gray-700"
                    >
                      <IconButton
                        color="green"
                        variant="text"
                        onClick={() => {
                          props?.setId(item['_id']);
                          props?.setOpen(true);
                          props?.setIsEdit(true);
                        }}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                )}
                {/* if view  */}
                {props?.view && (
                  <td className={classes}>
                    <Tooltip
                      content="View User"
                      className="text-[11px] bg-gray-700"
                    >
                      <IconButton variant="text" color="blue">
                        <EyeIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                )}
                {/* if delete  */}
                {props?.delete && (
                  <td className={classes}>
                    <Tooltip
                      content="Delete User"
                      className="text-[11px] bg-gray-700"
                    >
                      <IconButton variant="text" color="red">
                        <TrashIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
