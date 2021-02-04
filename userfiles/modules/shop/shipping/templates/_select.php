<div class="mw-shipping-select">
    <div   <?php if(count($shipping_options) == 1): ?>style="display: none" <?php endif; ?>>
        <select autocomplete="off" onchange="Gateway(this);" name="shipping_gw"
                class="field-full form-control mw-shipping-gateway mw-shipping-gateway-<?php print $params['id']; ?> <?php if (count($shipping_options) == 1): ?> semi_hidden <?php endif; ?>">
            <?php foreach ($shipping_options as $item) : ?>
                <option value="<?php print  $item['module_base']; ?>" <?php if ($selected_shipping_gateway == $item['module_base']): ?> selected <?php endif; ?>    ><?php print  $item['name']; ?></option>
            <?php endforeach; ?>
        </select>
    </div>
    <?php print $selected_shipping_gateway ?>
    <?php if (isset($selected_shipping_gateway) and is_module($selected_shipping_gateway)): ?>
        <div id="mw-shipping-gateway-selected-<?php print $params['id']; ?>">
            <module type="<?php print $selected_shipping_gateway ?>"/>
        </div>
    <?php endif; ?>
</div>