import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { Copy, MoreHorizontal, Pencil, Trash } from "lucide-react";

interface ProjectSettingsDropdownProps {
  onDelete: () => void;
}

const ProjectSettingsDropdown = ({
  onDelete,
}: ProjectSettingsDropdownProps) => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button size="sm" variant="light" isIconOnly>
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="edit" startContent={<Pencil className="size-4" />}>
          Edit Project
        </DropdownItem>
        <DropdownItem
          key="duplicate"
          startContent={<Copy className="size-4" />}
        >
          Duplicate
        </DropdownItem>
        <DropdownItem
          key="delete"
          startContent={<Trash className="size-4" />}
          className="text-danger"
          color="danger"
          onPress={onDelete}
        >
          Delete Project
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProjectSettingsDropdown;
