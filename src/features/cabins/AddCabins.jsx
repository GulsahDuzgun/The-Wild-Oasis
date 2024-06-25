import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

export default function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// export default function AddCabins() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setIsModalOpen((s) => !s)}>Add new cabin</Button>
//       {isModalOpen && (
//         <Modal onClose={() => setIsModalOpen((s) => !s)}>
//           <CreateCabinForm onCloseModal={() => setIsModalOpen((s) => !s)} />
//         </Modal>
//       )}
//     </div>
//   );
// }
