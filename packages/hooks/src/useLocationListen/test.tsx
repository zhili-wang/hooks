import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ProfilerCreate = ({ pageType }) => {
  const history = useHistory();
  const [isDisabled, setIsDisabled] = useState(true);
  const [openModalUnsave, setOpenModalUnsave] = useState(false);

  //Function to validate changes and open modal
  function validateChange(txt) {
    if (!isDisabled) {
      toggleModalUnsave();
      return false;
    }
  }

  useEffect(() => {
    history.block(validateChange);
  }, []);

  //Function to open or close modal
  function toggleModalUnsave() {
    setOpenModalUnsave(!openModalUnsave);
  }

  //Function to return landing page
  function returnPage() {
    history.push('/');
  }

  return (
    <div style={{ display: 'none' }}>
      <Modal
        open={openModalUnsave}
        onCancel={(detail) => toggleModalUnsave()}
        onOk={() => returnPage()}
        // actionsRight={
        //   <>
        //     <Button onClick={() => returnPage()}>
        //       Discard
        //     </Button>
        //     <Button
        //       // onClick={(evt) => saveAudienceData(evt)}
        //     >
        //       Save and exit
        //     </Button>
        //   </>
        // }
      >
        <p>Modal Children</p>
      </Modal>
    </div>
  );
};
export default ProfilerCreate;
