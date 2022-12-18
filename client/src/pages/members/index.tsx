import { useState } from "react";
import { useEffect } from "react";
import CreateMember from "../../components/create-member";
import Modal from "../../components/modal/Modal";
import TablePrimary, {
  HeaderProvider,
} from "../../components/tables/TablePrimary";
import useBooleanToggler, {
  useWorkingIndicator,
} from "../../hooks/useBooleanToggler";
import useInactive from "../../hooks/useInactive";
import LayoutMain from "../../layouts/LayoutMain";
import { Member } from "../../models/member";
import memberService from "../../services/memberService";
import { toast } from "react-toastify";

const headerOptions: HeaderProvider<Member>[] = [
  {
    label: "First Name",
    key: "firstName",
  },
  {
    label: "Last Name",
    key: "lastName",
  },
  {
    label: "Address",
    key: "address",
  },
  {
    label: "SSN",
    key: "ssn",
  },
];

const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const { isWorking, startWork, finishWork } = useWorkingIndicator();
  const { isToggled, toggle, unToggle } = useBooleanToggler();

  const getMembers = async () => {
    if (isWorking) return startWork();
    const response = await memberService.getMembers();
    finishWork();
    if ("error" in response) {
      toast(response.error);
    } else {
      setMembers(response);
    }
  };

  useEffect(() => {
    getMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCreateMember = (member: Member) => {
    setMembers((members) => [...members, member]);
    unToggle();
  };

  // When the user is inactiveAfter 2 minutes
  useInactive({
    onInactiveUser: () => getMembers(),
  });

  return (
    <>
      <LayoutMain>
        <TablePrimary
          title="List of members"
          onAddNew={toggle}
          headers={headerOptions}
          body={members}
        />
      </LayoutMain>
      {isToggled && (
        <Modal open onCloseModal={toggle} size="lg" closeClickOutside={false}>
          <CreateMember onCreateMember={onCreateMember} members={members} />
        </Modal>
      )}
    </>
  );
};

export default Members;
