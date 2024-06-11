im_leads = frappe.db.get_all("Indiamart Integration Log", fields=["name", "response"], filters={"status_code": "200", "is_processed": 0})
try:
    for lead in im_leads:
        r = lead.response
        r = json.loads(r)
        for l in r.get("RESPONSE"):
            im = frappe.get_doc({
                "doctype": "Lead",
                "lead_owner": "laxman@eactive.in",
                "source": "IndiaMart",
                "lead_name": l.get("SENDER_NAME"),
                "mobile_no": l.get("SENDER_MOBILE"),
                "email_id": l.get("SENDER_EMAIL"),
                "title": l.get("SUBJECT"),
                "company_name": l.get("SENDER_COMPANY"),
                "address_line1": l.get("SENDER_ADDRESS"),
                "city": l.get("SENDER_CITY"),
                "state": l.get("SENDER_STATE"),
                "pincode": l.get("SENDER_PINCODE"),
                "contact_no" : l.get("SENDER_MOBILE_ALT"),
                "indiamart_lead_id": l.get("UNIQUE_QUERY_ID"),
                "notes": f"{l.get('QUERY_MESSAGE')} <br>QUERY_PRODUCT_NAME : {l.get('QUERY_PRODUCT_NAME')} <br>QUERY_MCAT_NAME: {l.get('QUERY_MCAT_NAME')}"
            })
            im.insert(ignore_permissions=True)
            
        frappe.db.set_value("Indiamart Integration Log", lead.name, "is_processed", 1)

except Exception as e:
        frappe.log_error(str(e), 'process_india_mart_leads')