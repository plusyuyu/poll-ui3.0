import React from 'react';

class QuestionNaire extends React.Component {
 
  render(){
    return (
<<<<<<< HEAD
      <div className={style.questionNaire}>
        <Button type="primary" onClick={this.showModal}>
          添加
        </Button>
        <Button type="primary" onClick={this.deleteAll}>
          批量删除
        </Button>

        <Table
          rowSelection={rowSelection}
          size="small"
          rowKey="id"
          bordered
          pagination={false}
          columns={columns}
          dataSource={this.props.questionNaire.questionNaires}
        ></Table>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <QuestionNaireForm student={this.state.student} ref={this.getForm} />
        </Modal>
=======
      <div>
        <p>问卷管理</p>
>>>>>>> 64bd9996d228a6c6a1cceb078c7fc6456a173262
      </div>
    )
  }
}

export default QuestionNaire;