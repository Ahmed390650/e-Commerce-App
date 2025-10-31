"use client";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { HttpTypes } from "@medusajs/types";
import CountrySelect from "../country-select";
import useAdresses from "./useAdresses";

export default function Addresses({
  cart,
  region,
}: {
  cart: HttpTypes.StoreCart;
  region: HttpTypes.StoreRegion;
}) {
  const { form, handleEdit, isOpen, isPending } = useAdresses({ cart });
  const {
    billing_address: billing,
    sameAsBilling,
    shipping_address: shipping,
  } = form.state.values;
  return (
    <Card className="bg-white border shadow-sm rounded-2xl">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          Shipping Address
          {!isOpen && <CheckCircle2 className="w-5 h-5 text-green-600" />}
        </CardTitle>

        {!isOpen && cart?.shipping_address && (
          <Button variant="link" className="text-primary" onClick={handleEdit}>
            Edit
          </Button>
        )}
      </CardHeader>

      <CardContent>
        {isOpen ? (
          <form
            onSubmit={(e) => {
              console.log(e);
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-10"
          >
            {/* Shipping Address */}
            <FieldGroup className="grid grid-cols-2 gap-2">
              <form.AppField name="shipping_address.first_name">
                {(field) => (
                  <field.Input label="First Name" placeholder="John" />
                )}
              </form.AppField>

              <form.AppField name="shipping_address.last_name">
                {(field) => <field.Input label="Last Name" placeholder="Doe" />}
              </form.AppField>

              <form.AppField name="shipping_address.address_1">
                {(field) => (
                  <field.Input
                    label="Address Line 1"
                    placeholder="123 Main St"
                  />
                )}
              </form.AppField>

              <form.AppField name="shipping_address.address_2">
                {(field) => (
                  <field.Input
                    label="Address Line 2"
                    placeholder="Apt, Suite, etc."
                  />
                )}
              </form.AppField>

              <form.AppField name="shipping_address.company">
                {(field) => (
                  <field.Input label="Company" placeholder="Acme Inc." />
                )}
              </form.AppField>

              <form.AppField name="shipping_address.city">
                {(field) => <field.Input label="City" placeholder="New York" />}
              </form.AppField>

              <form.AppField name="shipping_address.province">
                {(field) => (
                  <field.Input
                    label="Province / State"
                    placeholder="California"
                  />
                )}
              </form.AppField>

              <form.AppField name="shipping_address.postal_code">
                {(field) => (
                  <field.Input label="Postal Code" placeholder="10001" />
                )}
              </form.AppField>

              <form.AppField name="shipping_address.country_code">
                {(field) => (
                  <field.Select label="Country Code">
                    <CountrySelect region={region} />
                  </field.Select>
                )}
              </form.AppField>

              <form.AppField name="shipping_address.phone">
                {(field) => (
                  <field.Input
                    label="Phone Number"
                    placeholder="+1 234 567 890"
                  />
                )}
              </form.AppField>
              <div className="flex justify-start">
                <form.AppField name="sameAsBilling">
                  {(field) => <field.Switch label="Same as Billing Address" />}
                </form.AppField>
              </div>
              {!sameAsBilling && (
                <FieldGroup>
                  <form.AppField name="shipping_address.first_name">
                    {(field) => (
                      <field.Input label="First Name" placeholder="John" />
                    )}
                  </form.AppField>

                  <form.AppField name="shipping_address.last_name">
                    {(field) => (
                      <field.Input label="Last Name" placeholder="Doe" />
                    )}
                  </form.AppField>

                  <form.AppField name="shipping_address.address_1">
                    {(field) => (
                      <field.Input
                        label="Address Line 1"
                        placeholder="123 Main St"
                      />
                    )}
                  </form.AppField>

                  <form.AppField name="shipping_address.address_2">
                    {(field) => (
                      <field.Input
                        label="Address Line 2"
                        placeholder="Apt, Suite, etc."
                      />
                    )}
                  </form.AppField>

                  <form.AppField name="shipping_address.company">
                    {(field) => (
                      <field.Input label="Company" placeholder="Acme Inc." />
                    )}
                  </form.AppField>

                  <form.AppField name="shipping_address.city">
                    {(field) => (
                      <field.Input label="City" placeholder="New York" />
                    )}
                  </form.AppField>

                  <form.AppField name="shipping_address.province">
                    {(field) => (
                      <field.Input
                        label="Province / State"
                        placeholder="California"
                      />
                    )}
                  </form.AppField>

                  <form.AppField name="shipping_address.postal_code">
                    {(field) => (
                      <field.Input label="Postal Code" placeholder="10001" />
                    )}
                  </form.AppField>

                  <form.AppField name="shipping_address.country_code">
                    {(field) => (
                      <field.Input label="Country Code" placeholder="US" />
                    )}
                  </form.AppField>

                  <form.AppField name="shipping_address.phone">
                    {(field) => (
                      <field.Input
                        label="Phone Number"
                        placeholder="+1 234 567 890"
                      />
                    )}
                  </form.AppField>
                </FieldGroup>
              )}

              <CardFooter className="flex justify-end pt-6">
                <Field orientation="horizontal">
                  <Button type="submit" disabled={isPending}>
                    {isPending && (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    )}
                    Continue to delivery
                  </Button>
                </Field>
              </CardFooter>
            </FieldGroup>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card data-testid="shipping-address-summary">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <p>
                  {shipping.first_name} {shipping.last_name}
                </p>
                <p>
                  {shipping.address_1} {shipping.address_2}
                </p>
                <p>
                  {shipping.postal_code}, {shipping.city}
                </p>
                <p>{shipping.country_code?.toUpperCase()}</p>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card data-testid="shipping-contact-summary">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <p>{shipping.phone || "—"}</p>
                <p>{cart.email || "—"}</p>
              </CardContent>
            </Card>

            {/* billing_address Address */}
            <Card data-testid="billing_address-address-summary">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Billing Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                {sameAsBilling ? (
                  <p>Billing and delivery address are the same.</p>
                ) : billing ? (
                  <>
                    <p>
                      {billing.first_name} {billing.last_name}
                    </p>
                    <p>
                      {billing.address_1} {billing.address_2}
                    </p>
                    <p>
                      {billing.postal_code}, {billing.city}
                    </p>
                    <p>{billing.country_code?.toUpperCase()}</p>
                  </>
                ) : (
                  <p>No billing address available.</p>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
