type editTeaClose = {
  open: false;
};

type editTeaOpenAdd = {
  open: true;
  mode: 'add';
};

type editTeaOpenEdit = {
  open: true;
  mode: 'edit';
  editTea: fullTea;
};

type editTea = editTeaClose | editTeaOpenAdd | editTeaOpenEdit;

export default editTea;
