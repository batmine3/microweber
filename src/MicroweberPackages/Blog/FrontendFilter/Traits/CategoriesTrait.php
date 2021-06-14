<?php
namespace MicroweberPackages\Blog\FrontendFilter\Traits;

use Illuminate\Support\Facades\URL;
use MicroweberPackages\Category\Models\Category;

trait CategoriesTrait {

    public function appendFiltersActiveCategories()
    {
        $categories = $this->request->get('categories', false);
        if (is_array($categories)) {
            foreach($categories as $categoryId) {

                $category = Category::where('id', $categoryId)->first();
                if ($category == null) {
                    continue;
                }

                $filter = new \stdClass();
                $filter->name = _e('Category', true) . ': ' . $category->title;
                $filter->link = '';
                $filter->value = $categoryId;
                $filter->key = 'categories[]';
                $this->filtersActive[] = $filter;
            }
        }
    }

    public function applyQueryCategories()
    {
        // Categories
        $category = $this->request->get('category');
        if (!empty($category)) {
            $this->queryParams['category'] = $category;
            $this->query->whereHas('categoryItems', function ($query) use($category) {
                $query->where('parent_id', '=', $category);
            });
        }
    }

    public function categories($template = 'blog::partials.categories')
    {
        $show = get_option('filtering_by_categories', $this->params['moduleId']);
        if (!$show) {
            return false;
        }

        $categoriesActiveIds = $this->request->get('categories', []);
        if (!is_array($categoriesActiveIds)) {
            $categoriesActiveIds = [];
        }

        $categoryQuery = Category::query();
        $categoryQuery->where('rel_id', $this->getMainPageId());
        $categoryQuery->orderBy('position');

        $categories = $categoryQuery->where('parent_id',0)->get();

        $request = $this->request;

        return view($template, compact('categories','categoriesActiveIds','request'));
    }

}
