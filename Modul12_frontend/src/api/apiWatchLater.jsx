import useAxios from ".";

export const GetAllData = async (userId) => {
  try {
    const response = await useAxios.get(`/watch-laters/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const CreateWatchLater = async (data) => {
  try {
    const userId = getUserIdFromState();  // Ambil id_user dari state atau context
    if (!userId) {
      throw new Error("User is not logged in");
    }

    const dateAdded = new Date().toISOString();  // Format tanggal saat ini

    const requestData = {
      ...data,
      id_user: userId,    // Pastikan id_user ada dalam data
      date_added: dateAdded  // Tanggal saat ini
    };

    const response = await useAxios.post("/watch-laters", requestData, {
      headers: {
        "Content-Type": "application/json",  // Pastikan ini JSON jika tidak ada file yang diupload
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};




export const DeleteWatchLater = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const response = await useAxios.delete(`/watch-laters/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


