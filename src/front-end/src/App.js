import { useState, useEffect } from "react";
import {
  Header,
  Navbar,
  AppShell,
  Footer,
  createStyles,
  UnstyledButton,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Button,
  Table,
  Modal,
  TextInput,
  Textarea,
} from "@mantine/core";

import { Edit, Trash } from "tabler-icons-react";

const fetchData = async () => {
  return fetch("http://localhost:8080/api/v1/items").then(res => {
    return res.json();
  });
};

const useStyles = createStyles((theme, _params) => ({
  menuButton: {
    padding: "0.7rem 1rem",
    marginBottom: "0.5rem",
    border: `1px solid ${theme.colors.gray[2]}`,
    borderLeft: `3px solid ${theme.colors.gray[6]}`,
  },
  inputButton: { marginLeft: "0.5rem" },
}));

const App = () => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [data, setData] = useState([]);
  const [openedMenu, setOpenedMenu] = useState(false);
  const [openedNewItemModal, setOpenedNewItemModal] = useState(false);
  const [openedEditItemModal, setOpenedEditItemModal] = useState(false);
  const [editedItemId, setEditedItemId] = useState("");

  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
  });

  const [editItem, setEditItem] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchData().then(res => {
      setData(res);
    });
  }, []);

  const handleNewItemSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:8080/api/v1/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    }).then(res => {
      if (res.status === 200) {
        fetchData().then(res => {
          setData(res);
        });
        setNewItem({
          title: "",
          description: "",
        });
        setOpenedNewItemModal(false);
      }
    });
  };

  const handleEditItemSubmit = e => {
    e.preventDefault();
    fetch(`http://localhost:8080/api/v1/items/${editedItemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editItem),
    }).then(res => {
      if (res.status === 200) {
        fetchData().then(res => {
          setData(res);
        });
        setEditItem({
          title: "",
          description: "",
        });
        setOpenedEditItemModal(false);
        setEditedItemId("");
      }
    });
  };

  const handleDeleteItem = id => {
    fetch(`http://localhost:8080/api/v1/items/${id}`, {
      method: "DELETE",
    }).then(res => {
      if (res.status === 200) {
        fetchData().then(res => {
          setData(res);
        });
      }
    });
  };

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!openedMenu}
          width={{ sm: 200, lg: 300 }}>
          <UnstyledButton className={classes.menuButton}>
            <Text>Home</Text>
          </UnstyledButton>
        </Navbar>
      }
      footer={<Footer height={60} p="md" />}
      header={
        <Header height={70} p="md">
          <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={openedMenu}
                onClick={() => setOpenedMenu(o => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
          </div>
        </Header>
      }>
      <Button mb={20} onClick={() => setOpenedNewItemModal(true)}>
        New
      </Button>

      <Modal
        opened={openedNewItemModal}
        onClose={() => setOpenedNewItemModal(false)}
        title="Create New List Item!">
        <form onSubmit={e => handleNewItemSubmit(e)}>
          <TextInput
            label="Title"
            mb={5}
            value={newItem.title}
            onChange={e => {
              setNewItem({
                ...newItem,
                title: e.target.value,
              });
            }}
          />
          <Textarea
            label="Description"
            mb={20}
            value={newItem.description}
            onChange={e => {
              setNewItem({
                ...newItem,
                description: e.target.value,
              });
            }}
          />
          <Button type="submit">Create</Button>
        </form>
      </Modal>

      <Modal
        opened={openedEditItemModal}
        onClose={() => setOpenedEditItemModal(false)}
        title="Edit List Item!">
        <form onSubmit={e => handleEditItemSubmit(e)}>
          <TextInput
            label="Edit Title"
            mb={5}
            value={editItem.title}
            onChange={e => {
              setEditItem({
                ...editItem,
                title: e.target.value,
              });
            }}
          />
          <Textarea
            label="Edit Description"
            mb={20}
            height={400}
            value={editItem.description}
            onChange={e => {
              setEditItem({
                ...editItem,
                description: e.target.value,
              });
            }}
          />
          <Button type="submit">Edit</Button>
        </form>
      </Modal>

      {data.length > 0 && (
        <Table verticalSpacing="xs">
          <thead>
            <tr>
              <th>Nr</th>
              <th>Title</th>
              <th>Description</th>
              <th>ID</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.id}</td>
                <td>
                  <Edit
                    cursor="pointer"
                    size={16}
                    onClick={() => {
                      setOpenedEditItemModal(true);
                      setEditedItemId(item.id);
                      setEditItem({
                        title: item.title,
                        description: item.description,
                      });
                    }}
                  />
                </td>
                <td>
                  <Trash
                    cursor="pointer"
                    size={16}
                    onClick={() => handleDeleteItem(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </AppShell>
  );
};

export default App;
