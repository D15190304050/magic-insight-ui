import {Form, Input, message, Modal} from "antd";
import axiosWithInterceptor, {jsonHeader} from "../../axios/axios.tsx";
import {PlaylistInfo, PlaylistWithVideoCheck} from "../../dtos/Playlist.ts";
import React from "react";
import {useForm} from "antd/es/form/Form";

/*
    这是一个 解构赋值 的写法，直接从 props 对象中提取三个属性，冒号:后面的部分是 TypeScript 类型注解
    handleNewPlaylist
    openAddPlaylistModal
    setOpenAddPlaylistModal

    handleNewPlaylist: null | ((PlaylistInfo: PlaylistWithVideoCheck) => void)
    含义：
    可以是 null，或者是一个 函数。
    如果是函数，它接收一个参数 PlaylistInfo（类型为 PlaylistWithVideoCheck），并返回 void（即没有返回值）。
    用途：
    当用户成功创建播放列表后，调用这个函数并传入新创建的播放列表数据（PlaylistWithVideoCheck）。
    如果不需要回调，可以传入 null
 */

const PlaylistCreator = ({handleNewPlaylist, openAddPlaylistModal, setOpenAddPlaylistModal}: {
    handleNewPlaylist: null | ((PlaylistInfo: PlaylistWithVideoCheck) => void),
    openAddPlaylistModal: boolean,
    setOpenAddPlaylistModal: React.Dispatch<React.SetStateAction<boolean>>
}) =>
{
    const [form] = useForm();

    const submitNewPlaylistRequest = () =>
    {
        form.validateFields()
            .then(values =>
            {
                axiosWithInterceptor.post("/api/playlist/create", values, jsonHeader)
                    .then(response =>
                    {
                        const newPlaylist: PlaylistWithVideoCheck = response.data.data;
                        if (handleNewPlaylist)
                            handleNewPlaylist(newPlaylist);

                        message.info("Create new playlist successfully.");
                        setOpenAddPlaylistModal(false);  //模态框是什么
                    })
            })
            .catch(error =>
            {
                message.error(error);
            });
    }

    const cancelNewPlaylistRequest = () =>
    {
        setOpenAddPlaylistModal(false);
    };

    return (
        <Modal
            title="New playlist"
            open={openAddPlaylistModal}
            onOk={submitNewPlaylistRequest}
            onCancel={cancelNewPlaylistRequest}
            okText="Submit"
            cancelText="Cancel"
        >
            <Form
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input the name of your playlist!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input the description of the playlist!' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default PlaylistCreator;