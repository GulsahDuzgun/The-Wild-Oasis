import { useCabins } from "./useCabins";
import Menus from "../../ui/Menus";
import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

export default function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();
  const filterWord = searchParams.get("discount") || "all";

  if (!cabins?.length) return <Empty resourceName="cabins" />;

  //FILTER
  let newCabinsArr = [];
  if (filterWord === "all") newCabinsArr = cabins;
  if (filterWord === "no-discount")
    newCabinsArr = cabins.filter((cabin) => cabin.discount === 0);
  if (filterWord === "with-discount")
    newCabinsArr = cabins.filter((cabin) => cabin.discount > 0);

  //SORTING

  const sortingWord = searchParams.get("sortBy") || "name-asc";
  const [sortField, direction] = sortingWord.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedArr = newCabinsArr?.sort((a, b) =>
    typeof a[sortField] === "string"
      ? a[sortField].localeCompare(b[sortField]) * modifier
      : (a[sortField] - b[sortField]) * modifier
  );

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>CABIN</div>
          <div>CAPACITY</div>
          <div>PRICE</div>
          <div>DISCOUNT</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedArr}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
}
