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
import CustomForms from './CustomForms';
import { useApi } from '../../../hooks/useCustomQuery';
import SimplePagination from '../../../components/pagination';
import ViewTable from './ViewTable';

const TABS = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Monitored',
    value: 'monitored'
  },
  {
    label: 'Unmonitored',
    value: 'unmonitored'
  }
];

const TABLE_HEAD = [
  'Full Name',
  'Email',
  'Mobile',
  'Status',
  'Edit',
  'View',
  'Delete',
  ''
];

export default function MembersTable() {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const editData = useApi({
    api: `https://my-api-roan.vercel.app/api/v1/crud/${id}`,
    options: {
      enabled: !!id
    }
  });

  const getAll = useApi({
    api: `https://my-api-roan.vercel.app/api/v1/crud?limit=${limit}&page=${page}`,
    value: [page, limit],
    options: {
      enabled: !!page && !!limit
    }
  });

  return (
    <div className="p-5">
      <CustomForms
        open={open}
        setOpen={setOpen}
        editData={isEdit ? editData : {}}
        isEdit={isEdit}
        formData={[
          {
            value: editData?.data?.crud?.fullName || '',
            isRequired: true,
            type: 'text',
            label: 'Full Name',
            name: 'fullName',
            isLabel: true
          },
          {
            value: editData?.data?.crud?.email || '',
            isRequired: true,
            label: 'Email',
            type: 'email',
            name: 'email',
            isLabel: true
          },
          {
            value: editData?.data?.crud?.mobile || '',
            isRequired: true,
            type: 'number',
            label: 'Mobile',
            name: 'mobile',
            isLabel: true
          },
          {
            value: editData?.data?.crud?.address || '',
            isRequired: false,
            label: 'Address',
            type: 'text',
            name: 'address',
            isLabel: true
          },
          {
            value: '',
            isRequired: false,
            type: 'select',
            label: 'Test',
            name: 'test',
            isLabel: true,
            options: [
              { label: 'Active', value: 1 },
              { label: 'Inactive', value: 0 }
            ]
          }
        ]}
      />
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-5 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Members list
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={() => {
                  setOpen(true);
                  setIsEdit(false);
                }}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* <Tabs value="all" className="w-full md:w-max">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs> */}
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <ViewTable
            data={getAll?.data?.docs}
            tableHead={TABLE_HEAD}
            fields={['fullName', 'email', 'mobile']}
            status={true}
            edit={true}
            view={true}
            delete={true}
            setId={setId}
            setOpen={setOpen}
            setIsEdit={setIsEdit}
          />
        </CardBody>
        <CardFooter className="flex items-center justify-end border-t border-blue-gray-50 p-4 ">
          <div className="flex gap-2">
            <SimplePagination
              page={page}
              setPage={setPage}
              noOfPage={getAll?.data?.totalPages}
              setPerPage={setLimit}
              perPage={limit}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
