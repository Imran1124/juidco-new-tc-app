import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import {
  FaBuilding,
  FaHouseUser,
  FaRoad,
  FaStreetView,
  FaToilet,
  FaToiletPaper,
  FaTrashAlt,
  FaTree,
  FaWater,
  FaHospital,
  FaStore,
  FaList,
  FaShoppingBag
} from 'react-icons/fa';

const CATEGORIES_DATA = [
  {
    name: 'Property',
    route: 'https://jharkhandegovernance.com/citizen/propertyDashboard',
    icon: <FaBuilding size="1.5rem" color="#2563eb" />,
    is_menu: true
  },
  {
    name: 'Water',
    route: 'https://jharkhandegovernance.com/citizen/water-dashboard',
    icon: <FaWater size="1.5rem" color="#2563eb" />,
    is_menu: true
  },
  //   trade
  {
    name: 'Trade',
    route: 'https://jharkhandegovernance.com/citizen/trade-dashboard',
    // trade icon
    icon: <FaStore size="1.5rem" color="#2563eb" />,
    is_menu: true
  },
  //   advertisement
  {
    name: 'Advertisement',
    route: 'https://jharkhandegovernance.com/citizen/advertisement-dashboard',
    // advertisement icon
    icon: <FaList size="1.5rem" color="#2563eb" />,
    is_menu: true
  },
  {
    name: 'Market',
    route: 'https://jharkhandegovernance.com/citizen/marketingDashboard',
    icon: <FaShoppingBag size="1.5rem" color="#2563eb" />,
    is_menu: true
  },
  {
    name: 'E-Services',
    route: 'https://jharkhandegovernance.com/citizen/marriage-index',
    icon: <FaHouseUser size="1.5rem" color="#2563eb" />,
    is_menu: true
  },
  {
    name: 'Sewerage',
    route: '#',
    icon: <FaToilet size="1.5rem" color="#2563eb" />,
    is_menu: true
  },
  {
    name: 'Road',
    route: '#',
    icon: <FaRoad size="1.5rem" color="#2563eb" />,
    is_menu: true
  },
  {
    name: 'Street Light',
    route: '#',
    icon: <FaStreetView size="1.5rem" color="#2563eb" />,
    is_menu: true
  },
  {
    name: 'Parks',
    route: '#',
    icon: <FaTree size="1.5rem" color="#2563eb" />,
    is_menu: true
  },
  {
    name: 'Garbage',
    route: '#',
    icon: <FaTrashAlt size="1.5rem" color="#2563eb" />,
    is_menu: true
  },
  {
    name: 'Drainage',
    route: '#',
    icon: <FaWater size="1.5rem" color="#2563eb" />,
    is_menu: true
  }
];

export default function Categories() {
  return (
    <div>
      <Card className=" w-full">
        <CardBody>
          <div className="flex items-center ">
            <FaHouseUser size="1.8rem" color="#2563eb" />
            <Typography variant="h6" color="blue-gray" className="ml-2">
              Categories
            </Typography>
          </div>
          {/* line  */}
          <div className="my-3 border-b-2"></div>
          {/*  */}
          <div className="grid grid-cols-4 gap-x-10 gap-y-6 mt-4">
            {CATEGORIES_DATA?.map(
              (element, index) =>
                element?.is_menu && (
                  <div key={index}>
                    <a
                      href={element?.route}
                      className="flex flex-col items-center"
                    >
                      <div className="bg-blue-50 rounded-xl shadow w-14 h-14 flex items-center justify-center">
                        {element?.icon}
                      </div>
                      <p className="text-xs mt-2 text-center">
                        {element?.name}
                      </p>
                    </a>
                  </div>
                )
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
