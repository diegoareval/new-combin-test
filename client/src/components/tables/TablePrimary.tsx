import { Plus } from "phosphor-react";
import ButtonPrimary from "../buttons/ButtonPrimary";
import EmptyData from "../empty-data";

export type HeaderProvider<T> = {
  label: string;
  key: keyof T;
};

type TablePrimaryProps<T> = {
  onAddNew: () => void;
  title: string;
  headers: HeaderProvider<T>[];
  body: T[];
};

function TablePrimary<T>({
  onAddNew,
  title,
  headers,
  body = [],
}: TablePrimaryProps<T>) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex items-center">
        <div className="flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        </div>
        <div className="mt-0 ml-16 flex-none">
          <ButtonPrimary
            icon={<Plus />}
            label="New member"
            onClick={onAddNew}
            className="inline-flex"
          />
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            {body?.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    {headers.map((header, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                      >
                        {header.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 ">
                  {body.map((item, index) => (
                    <tr key={index}>
                      {headers.map((headerBody, indexJ) => (
                        <td
                          key={indexJ}
                          className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0"
                        >
                          <>{item[headerBody.key]}</>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="mt-10w-full">
                <EmptyData title="Create a new member" onAddNew={onAddNew} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TablePrimary;
