@extends('checkout::layout')

@section('checkout_sidebar')
    Order info:
    @dump($order)
@endsection


@section('content')

    <div class="col-12">
        <form method="post" action="{{ route('checkout.shipping_method_save') }}">
            <div class="shop-cart" style="margin-top:25px;">

                <h1>Thank you, {{$order['first_name']}} {{$order['last_name']}}!</h1>

                <h2 class="text-uppercase">
                    <a href="{{ site_url() }}">Back to {{get_option('website_title', 'website')}}</a>
                </h2>

            </div>

        </form>
    </div>

@endsection