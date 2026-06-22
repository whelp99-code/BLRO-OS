export type DataTableColumn<T> = {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
};

export function DataTable<T extends { id?: string }>({ columns, data }: { columns: DataTableColumn<T>[]; data: T[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-left text-slate-500">
          <tr>{columns.map((column) => <th key={String(column.key)} className="px-4 py-3 font-medium">{column.header}</th>)}</tr>
        </thead>
        <tbody className="divide-y">
          {data.map((row, index) => (
            <tr key={String(row.id ?? index)} className="hover:bg-slate-50">
              {columns.map((column) => <td key={String(column.key)} className="px-4 py-3">{column.render ? column.render(row) : String(row[column.key as keyof T] ?? "")}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
