import redux from 'shri-mini-redux';

class BreadcrumbsView extends redux.View {
    render({ search }) {
        const items = search.path
            .split('/')
            .filter((item) => item); // фильтр пустых строк ""

        const itemsString = items.map(
            (item, index) => index === items.length - 1 
                ? `<div class="Breadcrumbs-Item Breadcrumbs-Item_state_open">
                        <div class="Text Text_size_s Tex_weight_l">${item}</div>
                    </div>`
                : `<div class="Breadcrumbs-Item">
                    <div class="Text Text_size_s">${item}</div>    
                </div>`
        )
        .join('');

        return `
            <div class="Breadcrumbs">
                ${itemsString}
            </div>
        `;
    }
}

export default BreadcrumbsView;