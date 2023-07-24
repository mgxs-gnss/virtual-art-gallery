"strict mode";

let list;

module.exports = {
  fetchList: async function (from, count) {
    if (list) return list.slice(from, from + count);
    list = (await (await fetch("https://api.mgxs.co/mem/list")).json()).map(
      (a) => ({ image_id: a.url })
    );
    return list.slice(from, from + count);
  },
  fetchImage: async function (obj, advicedResolution) {
    const blob = await fetch(obj.image_id).then((res) => res.blob());
    const index = obj.image_id.lastIndexOf("_");
    const gnss = obj.image_id
      .substring(index + 1, obj.image_id.length)
      .split(".")[0];
    return {
      title: `MEM from GNSS #${gnss}`,
      image: blob,
    };
  },
};
