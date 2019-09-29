import BreadcrumbsView from "./reduxViews/breadcrumbsView";
import SearchView from "./reduxViews/searchView";
import store from "../store/index";

const searchEl = document.getElementById('searchInput');
new SearchView(searchEl, store);

const breadcrumbsEl = document.getElementById('breadcrumbs');
new BreadcrumbsView(breadcrumbsEl, store);