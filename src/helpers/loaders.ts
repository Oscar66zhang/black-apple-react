export const loadProducts = async (
    productId: string | number,
    signal?: AbortSignal
) => {
    try {
        const response = await fetch(
            `http://152.136.182.210:12231/api/products/${productId}`,
            {
                method: "GET",
                signal: signal || null,
            }
        );
        if (!response.ok) {
            throw new Error(
                `Error fetching product with ID ${productId}: ${response.statusText}`
            );
        }
        return await response.json();
    } catch (error) {
        if ((error as any).name === "AbortError") {
            console.log("请求被取消");
        } else {
            console.error("加载失败：", error);
        }
        throw error;
    }
};
