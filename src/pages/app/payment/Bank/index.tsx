// import * as React from 'react';
// import { Fragment } from 'react';
// import { Box, Menu } from '@mui/material';
// import { ModeEdit, Delete } from '@mui/icons-material';
// import { Button, FormControl, Input, InputLabel, Link } from '@mui/material';
// import { Tab, Tabs } from '@mui/material';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';


// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   );
// }

// function a11yProps(index: number) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// export default function BasicTabs() {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     setValue(newValue);
//   };

//   const columns = [
//     { name: 'Bank Code' },
//     { name: 'Bank Name' },
//   ];

//   const column1 = [
//     {name: 'Code'},
//     {name: 'Fintech'}
//   ]

//   const column2 = [
//     {name: 'Account Number'},
//     {name: 'Desc'},
//     {name: 'Saldo'},
//     {name: 'Type'}
//   ]

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//         <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
//           <Tab label="bank" {...a11yProps(0)} />
//           <Tab label="Fintech" {...a11yProps(1)} />
//           <Tab label="Accounts" {...a11yProps(2)} />
//           <Tab label="TopUp"{...a11yProps(2)} />
//         </Tabs>
//       </Box>




//       <TabPanel value={value} index={0}>
//         <div>
//           <div className="mb-3">
//             <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//               <Link
//                 href={`bank/addBank`}
//                 type="button"
//                 className="order-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-purple-500 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1"
//               >
//                 Create
//               </Link>
//               <div className="flex items-center whitespace-nowrap rounded px-3 py-1.5 text-base font-normal text-neutral-700 dark:text-neutral-200">
//       Search Bank:
//     </div>
//               <input
//                 type="search"
//                 className="w-[1px] rounded border border-neutral-300 bg-transparent px-20 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
//                 placeholder="Bank Name "
//                 aria-label="Bank Name"
//                 aria-describedby="button-addon2"
//               />

//               <span className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200" id="basic-addon2">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
//                   <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
//                 </svg>
//               </span>
//             </div>
//           </div>
//           <table className="min-w-full table-fixed">
//             <thead>
//               <tr>
//                 {columns.map((col, index) => (
//                   <th key={index} className="pr-6 py-4 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
//                     <span>{col.name}</span>
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="">
//               <tr>
//                 <td className="py-3 text-sm text-gray-600">1</td>
//                 <td className="py-3 text-sm text-gray-600">ade</td>
//                 <td className="py-3 text-sm text-gray-600">ade</td>
//                 <td>
//                   <Menu className="relative inline-block text-left" open={false}>
//                     <div>
//                       <Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-black text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
//                         :
//                       </Button>
//                     </div>

//                     <TabPanel value={value} index = {0}
//                       >
//                       <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                         <div className="px-1 py-1">
//                           <Menu.Item>
//                             {({ active }) => (
//                               <button
//                                 className={`${
//                                   active ? 'bg-violet-500 text-white' : 'text-gray-900'
//                                 } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                               >
//                                 {active ? (
//                                   <ModeEdit className="mr-2 h-5 w-5" aria-hidden="true" />
//                                 ) : (
//                                   <ModeEdit className="mr-2 h-5 w-5" aria-hidden="true" />
//                                 )}
//                                 Edit
//                               </button>
//                             )}
//                           </Menu.Item>
//                         </div>
//                         <div className="px-1 py-1">
//                           <Menu.Item>
//                             {({ active }) => (
//                               <button
//                                 className={`${
//                                   active ? 'bg-violet-500 text-white' : 'text-gray-900'
//                                 } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                               >
//                                 {active ? (
//                                   < classNaDeleteme="mr-2 h-5 w-5 text-violet-400" aria-hidden="true" />
//                                 ) : (
//                                   <Delete className="mr-2 h-5 w-5 text-violet-400" aria-hidden="true" />
//                                 )}
//                                 Delete
//                               </button>
//                             )}
//                           </Menu.Item>
//                         </div>
//                       </Menu.Items>
//                     </TabPanel>

//                   </Menu>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </TabPanel>


//       <TabPanel value={value} index={1}>
//        <div>
//        contents: <div>
//              <div className="mb-3">
//   <div className="relative mb-4 flex w-full flex-wrap items-stretch ">
//   <Link href={`Fintech/addFintech`}
        
//         type="button"
//         className="order-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-purple-500 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1"
//       >
//         Create
//       </Link>
//       <div className="flex items-center whitespace-nowrap rounded px-3 py-1.5 text-base font-normal text-neutral-700 dark:text-neutral-200">
//       Search Fintech:
//     </div>
//     <input
//       type="search"
//       className="w-[1px] rounded border border-neutral-300 bg-transparent px-20 py-[0.25rem] 
//       text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] 
//       focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] dark:border-neutral-600 
//       dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
//       placeholder="Fintech Name"
//       aria-label="Fintech Name"
//       aria-describedby="button-addon2" />

//     <span
//       className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
//       id="basic-addon2">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 20 20"
//         fill="currentColor"
//         className="h-5 w-5">
//         <path
//           fill-rule="evenodd"
//           d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
//           clip-rule="evenodd" />
//       </svg>
//     </span>
//   </div>
// </div>
//             <table className="min-w-full table-fixed ">
//           <thead>
//             <tr>
//               {(column1 || []).map((col) => (
//                 <th className="pr-6 py-4 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
//                   <span className="">{col.name}</span>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="">
//             {/* {(bank || []).map((data:any, index:any) => ( */}
//               <tr 
//               // key=
//               // {data.id}
//               >
//                 <td className="py-3 text-sm text-gray-600">1</td>
//                 <td className="py-3 text-sm text-gray-600">
//                   ade
//                 </td>
//                 <td className="py-3 text-sm text-gray-600">
//                   ade
//                 </td>
//                 <td>
//                   <Menu className="relative inline-block text-left" open={false}>
//                     <div>
//                       <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-black text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
//                         {/* <EllipsisVerticalIcon /> */} :
//                       </Menu.Button>
//                     </div>
//                     <TabPanel value={value} index={1}
//                       >
                      
//                       <Menu.Items className="absolute right-10 top-0 w-32 rounded-md bg-white shadow-lg focus:outline-none">
//                         <div className="px-1 py-1 ">
//                           <Menu.Item>
//                             {({ active }) => (
//                               <Link
//                                 // href={`/users/edit-user${id}`}
//                                 // onClick={() => updateBank(data)}
//                                 className={`${active
//                                     ? 'bg-violet-500 text-white'
//                                     : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`} href={''}                                >

//                                 Edit
//                               </Link>
//                             )}
//                           </Menu.Item>
//                           <Menu.Item>
//                             {({ active }) => (
//                               <button
//                                 // onClick={() => deleteBank(data)}
//                                 className={`${
//                                   active
//                                     ? 'bg-violet-500 text-white'
//                                     : 'text-gray-900'
//                                 } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                               >
//                                 Delete
//                               </button>
//                             )}
//                           </Menu.Item>
//                         </div>
//                       </Menu.Items>
//                     </Transition>
//                   </Menu>
//                 </td>
//               </tr>
//             {/* ))} */}
            
//           </tbody>
//         </table>
//         </div>
//        </div>
//       </TabPanel>


//       <TabPanel value={value} index={2}>
//         <div>
//         contents: <div>
//           <div className="mb-3">
// <div className="relative mb-4 flex w-full flex-wrap items-stretch ">
// <Link href={`Accounts/addAccounts`}
     
//      type="button"
//      className="order-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-purple-500 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1"
//    >
//      Create
//    </Link>
//  <input
//    type="search"
//    className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
//    placeholder="Accounts Name"
//    aria-label="Accounts Name"
//    aria-describedby="button-addon2" />

//  <span
//    className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
//    id="basic-addon2">
//    <svg
//      xmlns="http://www.w3.org/2000/svg"
//      viewBox="0 0 20 20"
//      fill="currentColor"
//      className="h-5 w-5">
//      <path
//        fill-rule="evenodd"
//        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
//        clip-rule="evenodd" />
//    </svg>
//  </span>
// </div>
// </div>
//          <table className="min-w-full table-fixed ">
//        <thead>
//          <tr>
//            {(column2 || []).map((col) => (
//              <th className="pr-6 py-4 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
//                <span className="">{col.name}</span>
//              </th>
//            ))}
//          </tr>
//        </thead>
//        <tbody className="">
//          {/* {(bank || []).map((data:any, index:any) => ( */}
//            <tr 
//            // key=
//            // {data.id}
//            >
//              <td className="py-3 text-sm text-gray-600">1</td>
//              <td className="py-3 text-sm text-gray-600">
//                ade
//              </td>
//              <td className="py-3 text-sm text-gray-600">
//                ade
//              </td>
//              <td>
//                <Menu as="div" className="relative inline-block text-left">
//                  <div>
//                    <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-black text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
//                      {/* <EllipsisVerticalIcon /> */} :
//                    </Menu.Button>
//                  </div>
//                  <Transition
//                    as={Fragment}
//                    enter="transition ease-out duration-100"
//                    enterFrom="transform opacity-0 scale-95"
//                    enterTo="transform opacity-100 scale-100"
//                    leave="transition ease-in duration-75"
//                    leaveFrom="transform opacity-100 scale-100"
//                    leaveTo="transform opacity-0 scale-95"
//                  >
                   
//                    <Menu.Items className="absolute right-10 top-0 w-32 rounded-md bg-white shadow-lg focus:outline-none">
//                      <div className="px-1 py-1 ">
//                        <Menu.Item>
//                          {({ active }) => (
//                            <Link
//                              // href={`/users/edit-user${id}`}
//                              // onClick={() => updateBank(data)}
//                              className={`${active
//                                  ? 'bg-violet-500 text-white'
//                                  : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`} href={''}                                >

//                              Edit
//                            </Link>
//                          )}
//                        </Menu.Item>
//                        <Menu.Item>
//                          {({ active }) => (
//                            <button
//                              // onClick={() => deleteBank(data)}
//                              className={`${
//                                active
//                                  ? 'bg-violet-500 text-white'
//                                  : 'text-gray-900'
//                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                            >
//                              Delete
//                            </button>
//                          )}
//                        </Menu.Item>
//                      </div>
//                    </Menu.Items>
//                  </Transition>
//                </Menu>
//              </td>
//            </tr>
//          {/* ))} */}
         
//        </tbody>
//      </table>
//      </div>
//         </div>
//       </TabPanel>


//       <TabPanel value={value} index={3}>
//         <Box  sx={{ minWidth: 120 }}>
//         <div>
//         <div className='flex bg-white-100'>
//             <div className='w-1/2 text-center'>
//               Source
//               <div className="mb-3" > 
// <div className="relative mb-4 flex w-full flex-wrap items-stretch ">
// <div className="flex items-center whitespace-nowrap rounded px-3 py-1.5 text-base font-normal text-neutral-700 dark:text-neutral-200">
//       Source Name:
//     </div>
//  <input
//    type="search"
//    className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
//    placeholder="Accounts Name"
//    aria-label="Accounts Name"
//    aria-describedby="button-addon2" />
//  <span
//    className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
//    id="basic-addon2">
//    <svg
//      xmlns="http://www.w3.org/2000/svg"
//      viewBox="0 0 20 20"
//      fill="currentColor"
//      className="h-5 w-5">
//      <path
//        fill-rule="evenodd"
//        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
//        clip-rule="evenodd" />
//    </svg>
//  </span> 
 
// </div>
// <div className="flex items-center whitespace-nowrap rounded px-3 py-1.5 text-base font-normal text-neutral-700 dark:text-neutral-200">
// Account:
// <FormControl sx={{ m: 1, minWidth: 200 }} size='small' variant='standard'>
// <InputLabel id="demo-simple-select-helper-label">Account Number</InputLabel>
// <Select
//           label = "input Account"
//           value=""
//         >
//           <MenuItem value={10}>Credit</MenuItem>
//           <MenuItem value={20}>Fintech</MenuItem>
//           <MenuItem value={30}>Payment</MenuItem>
//         </Select>

// </FormControl>



// </div>
// <br/>
// <div className="relative mb-4 flex w-full flex-wrap items-stretch ">
// <div className="flex items-center whitespace-nowrap rounded px-3 py-1.5 text-base font-normal text-neutral-700 dark:text-neutral-200">
//       Current Saldo:
//     </div>
//  <input
//    type="number"
//    className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
//    placeholder="Rp"
//    aria-label=""
//    aria-describedby="button-addon2" />
//  <span
//    className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
//    id="basic-addon2">
//  </span> 
 
// </div>


//     <div className="flex items-center whitespace-nowrap rounded px-3 py-1.5 text-base font-normal text-neutral-700 dark:text-neutral-200">
// <div className="mt-4">
//           <button
//             type="submit"
//             className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//           >
//             Transfer
//           </button>
//         </div>
    
//     </div>
// </div>

//             </div>
//             <div className='w-1/2 text-center'>
//            Target
//               <div className="mb-3">
// <div className="relative mb-4 flex w-full flex-wrap items-stretch ">
//     <div className="flex items-center whitespace-nowrap rounded px-3 py-1.5 text-base font-normal text-neutral-700 dark:text-neutral-200">
//       Target:
//     </div>
//  <input
//    type="search"
//    className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
//    placeholder="Goto"
//    aria-label="Goto"
//    aria-describedby="button-addon2" />
//  <span
//    className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
//    id="basic-addon2">
//    <svg
//      xmlns="http://www.w3.org/2000/svg"
//      viewBox="0 0 20 20"
//      fill="currentColor"
//      className="h-5 w-5">
//      <path
//        fill-rule="evenodd"
//        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
//        clip-rule="evenodd" />
//    </svg>
//  </span>
// </div>
// <div className="flex items-center whitespace-nowrap rounded px-3 py-1.5 text-base font-normal text-neutral-700 dark:text-neutral-200">
// <div>Account:</div>
// <FormControl sx={{ m: 1, minWidth: 200 }} size='small' variant='standard'>
//   <InputLabel id="demo-simple-select-helper-label">Account Number</InputLabel>
// <Select
//           label = "input Account"
//           value=""
//         >
//           <MenuItem value={10}>Credit</MenuItem>
//           <MenuItem value={20}>Fintech</MenuItem>
//           <MenuItem value={30}>Payment</MenuItem>
//         </Select>

// </FormControl>
// </div>
// </div>
// <br/>
// <div className="relative mb-4 flex w-full flex-wrap items-stretch ">
// <div className="flex items-center whitespace-nowrap rounded px-3 py-1.5 text-base font-normal text-neutral-700 dark:text-neutral-200">
//       Current Saldo:
//     </div>
//  <input
//    type="number"
//    className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
//    placeholder="Rp"
//    aria-label=""
//    aria-describedby="button-addon2" />
//  <span
//    className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
//    id="basic-addon2">
//  </span> 
 
// </div>


//               </div> 
//           </div>
//         </div>
//         </Box>
//       </TabPanel>
      
//     </Box>
//   );
// }
