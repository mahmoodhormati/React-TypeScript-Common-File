import React, { Fragment, useEffect, useState } from "react";
import "./Table.scss";
import { useTranslation } from 'react-i18next'

import {

  useExpanded,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { TableProps } from "./TableProps";
import CheckboxForTable from "./TableUtils/CheckboxForTable";

import PageSizeTable from "./TableUtils/PageSizeTable";
import PaginationTable from "./TableUtils/PaginationTable";
import { formatter } from "../../../../../AfraHolding/src/Utils/Formatter";

export function TableComponent<T extends {}>({ props, children }: React.PropsWithChildren<{ props: TableProps<T> }>) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    prepareRow,
    setPageSize,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageOptions,
    pageCount,
    selectedFlatRows,


    state: { selectedRowIds },
  } = useTable<T>(
    {
      columns: props.columns,
      data: props.data,
      initialState: {
        hiddenColumns: [],
      },
    },
    useGlobalFilter,

    useSortBy,

    useExpanded,
    usePagination,
    useRowSelect,
    (hooks) => {

      hooks.visibleColumns.push((columns: any) => {

        if (props.IsSelectable === undefined) {

          if (props.childrenOnClick) {


            return [


              {
                // Build our expander column
                id: "expander", // Make sure it has an ID
                Header: ({ getToggleAllRowsExpandedProps }) => (
                  <span {...getToggleAllRowsExpandedProps()}></span>
                ),
                Cell: (row: any) => (
                  // Use Cell to render an expander for each row.
                  // We can use the getToggleRowExpandedProps prop-getter
                  // to build the expander.

                  <span className="Expanded" {...row.row.getToggleRowExpandedProps()}>
                    {row.row.isExpanded ? (
                      <svg
                        {...row.row.getRowProps(props.childrenOnClick && props.childrenOnClick(row))}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-chevron-down"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                        />
                      </svg>
                    ) : (
                      <svg
                        {...row.row.getRowProps(props.childrenOnClick && props.childrenOnClick(row))}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-chevron-left"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                        />
                      </svg>
                    )}
                  </span>
                ),
              },
             
              ...columns,
            ];

          }
          else {
            return [

              {
                id: "selection",
                accessor: "انتخاب",
                header: "انتخاب",

                // The header can use the table's getToggleAllRowsSelectedProps method
                // to render a checkbox
                Header: ({ getToggleAllRowsSelectedProps }) => (
                  <div className="Select">
                    <CheckboxForTable {...getToggleAllRowsSelectedProps()} />
                  </div>
                ),

                // The cell can use the individual row's getToggleRowSelectedProps method
                // to the render a checkbox
                Cell: (row: any) => (
                  <div className="Select">
                    <CheckboxForTable {...row.row.getToggleRowSelectedProps()} />
                  </div>
                ),
              },
            
              ...columns,
            ];

          }
        }
        else {
          return [...columns]
        }
      });
    }
  );
  const [selectFunc, setSelectFunc] = useState(0);

  useEffect(() => {
    if (props.getData) props.getData(selectedFlatRows);
  }, [selectedRowIds]);
  const { pageSize, pageIndex
  } = state;
  const { t } = useTranslation()

  useEffect((): ReturnType<React.EffectCallback> => {
    const script = document.createElement("script");
    var id = props.ComponentId
    const scriptText = document.createTextNode(` $('#${id} th').each(function(idx, el) {
      var check = !!$('#${id} tbody tr').find('td:eq(' + idx + ')').filter(function() {
        return $.trim($(this).html()).length;
      }).length;
      
        
        $('#${id} tr').find('td:eq(' + idx + '), th:eq(' + idx + ')').show();
        if (!check) {
            $('#${id} tr').find('td:eq(' + idx + '), th:eq(' + idx + ')').hide();
        }
      
    
    })`)

    script.appendChild(scriptText);
    document.body.appendChild(script);

    return (): void => {
      (
        () => document.body.removeChild(script)
      )
    }

  }, [props.data, page, props.ComponentId])


  return (

    <div className="col-12 text-center">
      <div className="d-flex justify-content-between align-items-center">


        {props.bulkJob !== undefined ? <div>
          <span className=" " style={{ fontSize: "smaller" }}>
            {" "}
            اقدام دسته جمعی:{" "}
          </span>
          {rows.find(
            (item: any) =>
              item.original.active === true || item.original.active === false
          ) ? (
            <select
              // style={{height:'20px'}}
              className="btn   non-hover  bg-transparent shadow-none   "
              style={{ fontSize: "smaller" }}
              value={selectFunc}
              onChange={(e) => {
                setSelectFunc(Number(e.target.value));
              }}
            >
              {[
                { id: 1, name: "انتخاب" },
                { id: 2, name: "فعال " },
                { id: 5, name: "غیرفعال " },
                {
                  id: 3,
                  name: "کپی",
                },
                { id: 4, name: "حذف" },
              ].map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          ) : (
            <select
              // style={{height:'20px'}}
              className="btn  non-hover  bg-transparent shadow-none   "
              style={{ fontSize: "smaller" }}
              value={selectFunc}
              onChange={(e) => {
                setSelectFunc(Number(e.target.value));
              }}
            >
              {[
                { id: 1, name: "انتخاب" },
                { id: 3, name: "کپی" },
                { id: 4, name: "حذف" },
              ].map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="btn btn-outline-primary"
            onClick={() => props.bulkJob !== undefined && props.bulkJob(selectFunc)}
          >
            {t('submit')}
          </button>
        </div> : ''}
      </div>
      <div className="table table-responsive col-xl-12 col-lg-12 col-md-12 col-sm-12" >
        <table id={props.ComponentId} className="table  responsive table-striped  mb-4  " {...getTableProps()}>
          <thead className="text-center">
            {headerGroups.map((headerGroup) => {
              const { key, ...restHeaderProps } = headerGroup.getHeaderGroupProps();
              if (props.setPageApiSize !== undefined) {
                return (

                  <tr {...restHeaderProps} key={key} >
                    {headerGroup.headers.map((column) => ({
                      ...(props.ClickableHeader ? (
                        <th className="" {...props.ClickableHeader(column)}>
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>
                      ) : (
                        <th className="" {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      )),
                    }))}
                  </tr>
                )
              }
              else {
                return (

                  <tr {...restHeaderProps} key={key} >
                    {headerGroup.headers.map((column, index) => {
                      if (index > 0) {
                        return (<th className="" {...column.getHeaderProps(column.getSortByToggleProps())}>
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>)
                      }

                      else {
                        return (
                          <th className="" {...column.getHeaderProps()}>
                            {column.render("Header")}

                          </th>
                        )
                      }
                    }

                    )}
                  </tr>
                )
              }
            })}
          </thead>


          {props.setPageApiSize !== undefined ? <tbody className="" {...getTableBodyProps()}>



            {

              rows.map((row) => {

                prepareRow(row);

                const { key, ...restRowProps } = row.getRowProps()
                return (
                  <Fragment key={key}>
                    <tr {...restRowProps} key={key}>
                      {
                        // loop over the rows cells
                        row.cells.map((cell, index) => {
                          const { key, ...restCellProps } = cell.getCellProps()
                          if (
                            typeof cell.value === typeof "" &&
                            cell.value.length > 60
                          ) {
                            return (
                              <td
                                key={key}
                                {...restCellProps}
                                className="pr-2"
                                aria-label={`${headerGroups.map(
                                  (headerGroup) =>
                                    headerGroup.headers
                                      .map((column) => column.Header)
                                      .filter((item, i) => { item === item && i > 0 && i === index })
                                      .map((item) => item)[0]
                                )}`}
                                title={cell.value}
                              >
                                {cell.value.substring(0, 30)}
                              </td>
                            );
                          } else {
                            return (
                              <td
                                key={key}
                                {...restCellProps}
                                className="pr-2"
                                aria-label={`${headerGroups.map(
                                  (headerGroup) =>
                                    headerGroup.headers
                                      .map((column) => column.Header)
                                      .filter((item, i) => item === item && i > 0 && i === index)
                                      .map((item) => item)[0]
                                )}`}
                              >
                                {cell.render("Cell")}
                              </td>
                            );
                          }
                        })
                      }

                    </tr>

                    {props.chidrenData?.isExpanded && row.id === props.chidrenData.id ?
                      <tr key={props.chidrenData.id} className="expandedTable" >

                        <td key={props.chidrenData.id} colSpan={12}>
                          {children}
                        </td>

                      </tr> : ''}

                  </Fragment>

                );



              })


            }

            {props.hasTotal ? <tr >
              <td colSpan={props.columnSpanTitle}> {t('sum')}</td>
              <td colSpan={props.columnSpanPrice} > {formatter.format(props.myTotal!)}</td>



            </tr> : ""}

          </tbody>
            : props.HasPagination === undefined ?
              <tbody className="" {...getTableBodyProps()}>
                {
                  // loop over the rows
                  page.map((row) => {
                    prepareRow(row);

                    const { key, ...restRowProps } = row.getRowProps()
                    return (
                      <Fragment key={key}>
                        <tr {...restRowProps} key={key}>
                          {
                            // loop over the rows cells
                            row.cells.map((cell, index) => {
                              const { key, ...restCellProps } = cell.getCellProps()
                              if (
                                typeof cell.value === typeof "" &&
                                cell.value.length > 60
                              ) {
                                return (
                                  <td
                                    key={key}
                                    {...restCellProps}
                                    className="pr-2"
                                    aria-label={`${headerGroups.map(
                                      (headerGroup) =>
                                        headerGroup.headers
                                          .map((column) => column.Header)
                                          .filter((item, i) => item === item && i > 0 && i === index)
                                          .map((item) => item)[0]
                                    )}`}
                                    title={cell.value}
                                  >
                                    {cell.value.substring(0, 30)}
                                  </td>
                                );
                              } else {
                                return (
                                  <td
                                    key={key}
                                    {...restCellProps}
                                    className="pr-2"
                                    aria-label={`${headerGroups.map(
                                      (headerGroup) =>
                                        headerGroup.headers
                                          .map((column) => column.Header)
                                          .filter((item, i) => item === item && i > 0 && i === index)
                                          .map((item) => item)[0]
                                    )}`}
                                  >
                                    {cell.render("Cell")}
                                  </td>
                                );
                              }
                            })
                          }
                        </tr>
                        {props.chidrenData?.isExpanded && row.id === props.chidrenData.id ?
                          <tr key={props.chidrenData.id} className="expandedTable" >

                            <td key={props.chidrenData.id} colSpan={12}>
                              {children}
                            </td>

                          </tr> : ''}

                      </Fragment>
                    );
                  })
                }

                {props.hasTotal ? <tr >
                  <td colSpan={props.columnSpanTitle}> {t('sum')}</td>
                  <td colSpan={props.columnSpanPrice} > {formatter.format(props.myTotal!)}</td>



                </tr> : ""}

              </tbody>
              : <tbody className="" {...getTableBodyProps()}>

                {
                  // loop over the rows
                  rows.map((row) => {
                    prepareRow(row);

                    const { key, ...restRowProps } = row.getRowProps()
                    return (
                      <Fragment key={key}>
                        <tr {...restRowProps} key={key}>
                          {
                            // loop over the rows cells
                            row.cells.map((cell, index) => {
                              const { key, ...restCellProps } = cell.getCellProps()
                              if (
                                typeof cell.value === typeof "" &&
                                cell.value.length > 60
                              ) {
                                return (
                                  <td
                                    key={key}
                                    {...restCellProps}
                                    className="pr-2"
                                    aria-label={`${headerGroups.map(
                                      (headerGroup) =>
                                        headerGroup.headers
                                          .map((column) => column.Header)
                                          .filter((item, i) => { item === item && i > 0 && i === index })
                                          .map((item) => item)[0]
                                    )}`}
                                    title={cell.value}
                                  >
                                    {cell.value.substring(0, 30)}
                                  </td>
                                );
                              } else {
                                return (
                                  <td
                                    key={key}
                                    {...restCellProps}
                                    className="pr-2"
                                    aria-label={`${headerGroups.map(
                                      (headerGroup) =>
                                        headerGroup.headers
                                          .map((column) => column.Header)
                                          .filter((item, i) => item === item && i > 0 && i === index)
                                          .map((item) => item)[0]
                                    )}`}
                                  >
                                    {cell.render("Cell")}
                                  </td>
                                );
                              }
                            })
                          }
                        </tr>
                        {props.chidrenData?.isExpanded && row.id === props.chidrenData.id ?
                          <tr key={props.chidrenData.id} className="expandedTable" >

                            <td key={props.chidrenData.id} colSpan={12}>
                              {children}
                            </td>

                          </tr> : ''}

                      </Fragment>
                    );
                  })
                }


                {props.hasTotal ? <tr >
                  <td colSpan={props.columnSpanTitle}> {t('sum')}</td>
                  <td colSpan={props.columnSpanPrice} > {formatter.format(props.myTotal!)}</td>



                </tr> : ""}
              </tbody>
          }



        </table>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div>

          {props.pageApiSize && props.totalResult ? <span className=" " style={{ fontSize: "small" }}>
            {t('showing')}
            {""} {props.pageApiSize >= props.totalResult ? props.totalResult : props.pageApiSize} {""}
            {`${t('item')} ${t('from')}`}
            {""} {props.totalResult === 0 ? rows.length : props.totalResult} {""}
          </span> : props.HasPagination === undefined ? <span className=" " style={{ fontSize: 'small' }} >
            {t('showing')}

            {""}  {page.length}  {""}

            {`${t('item')} ${t('from')}`}
            {""}   {rows.length}  {""}
          </span> : ''}
        </div>

        {props.setPageApiSize ? <div className="">

          <PaginationTable
            setPageNumber={props.setPageNumber}
            pageNumber={props.pageNumber}
            getDataBySearch={props.getDataBySearch}
            pageSize={props.pageApiSize}
            totalResult={props.totalResult}
          />
        </div>
          : props.HasPagination === undefined ?

            <div className="text-center">
              <button className=' Pagination  btn btn-outline-secondary m-1' onClick={() => gotoPage(0)} disabled={!canPreviousPage} data-title={`${t('last')} ${t('page')}`}>{'<<'}</button>
              <button className='   Pagination  btn btn-outline-secondary m-1' data-title={`${t('back')} ${t('page')}`} onClick={() => previousPage()} disabled={!canPreviousPage}> {'<'}</button>
              <span className="mt-3">
                {pageIndex + 1} {t('from')} {pageOptions.length}
              </span>
              <button className='  Pagination  btn btn-outline-secondary m-1' data-title={`${t('next')} ${t('page')}`} onClick={() => nextPage()} disabled={!canNextPage}> {'>'}</button>
              <button className='  Pagination  btn btn-outline-secondary m-1' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} data-title={`${t('first')} ${t('page')}`}>{'>>'}</button>

            </div>

            : ''}
        {props.setPageApiSize ? <PageSizeTable
          getDataBySearch={props.getDataBySearch}
          pageSize={props.pageApiSize}
          setPageSize={props.setPageApiSize}
        /> : props.HasPagination === undefined ? <div>
          <span className=" py-3" style={{ fontSize: 'smaller' }} > {t('pageSize')} : </span>
          <select

            className='btn m-1  non-hover  bg-transparent shadow-none  p-0 '
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[10, 25, 50, 100].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>

            ))}
          </select>
        </div> : ''}
      </div>




      <br />

    </div>

  );
}
