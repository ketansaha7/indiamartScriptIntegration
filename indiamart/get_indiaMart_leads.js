glusr_crm_key = "xxxyyydhhdyhhdhhhd" # Indiamart Auth Key
url = f'https://mapi.indiamart.com/wservce/crm/crmListing/v2/?glusr_crm_key={glusr_crm_key}'

try:
    resp = frappe.make_get_request(url)
    frappe.get_doc({
        "doctype": "Indiamart Integration Log",
        "posting_time": frappe.utils.get_datetime(),
        "url": url,
        "response": json.dumps(resp),
        "status_code": resp['CODE'],
        "status": resp['STATUS']
        
    }).insert()
    
    frappe.response["message"] = "IM Log Created"

except Exception as e:
    frappe.log_error(str(e), 'India Mart Error')
    frappe.response["message"] = str(e) 