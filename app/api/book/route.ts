import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { Resend } from 'resend';
import { square, resolveVariationId } from '@/lib/square';
import { SERVICES, REAR_GLASS_LABEL } from '@/lib/pricing';
import type { ServiceKey, RearGlass } from '@/lib/pricing';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildBookingEmailHtml(params: {
  startAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleBody: string;
  serviceName: string;
  rearGlassLabel: string;
  serviceLocation: string;
  notes: string;
  startingPrice: number;
  durationHours: string;
  depositCollected: boolean;
  manualCreationRequired?: boolean;
}) {
  const startTime = new Date(params.startAt).toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'America/Los_Angeles',
  });
  const row = (label: string, value: string) => `
    <tr><td style="padding:10px 0;border-bottom:1px solid #262626;background-color:#0F0F0F;" bgcolor="#0F0F0F">
      <span style="font-size:11px;color:#9E9E9E;text-transform:uppercase;letter-spacing:0.05em;background-color:transparent;">${label}</span><br>
      <span style="font-size:15px;color:#F5F5F5;background-color:transparent;-webkit-text-size-adjust:100%;">${value}</span>
    </td></tr>`;
  const vehicleStr = `${params.vehicleYear} ${params.vehicleMake} ${params.vehicleModel}`.trim();
  const priceStr = params.startingPrice > 0 ? `From $${params.startingPrice}` : 'To be confirmed';
  return `
<!DOCTYPE html>
<html lang="en" style="color-scheme:dark;">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>New Booking</title>
<style type="text/css">
@media (max-width:480px){
  .pad-outer{padding:12px 8px !important;}
  .pad-inner{padding:20px 16px !important;}
  .pad-header{padding:20px 16px !important;}
  .pad-footer{padding:16px !important;}
  .title-font{font-size:18px !important;}
}
body{-webkit-text-size-adjust:100%;}
.badge-nowrap{white-space:nowrap !important;}
</style>
</head>
<body style="margin:0;padding:0;background-color:#000000 !important;color:#F5F5F5 !important;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%;" bgcolor="#000000">
<div style="background-color:#000000 !important;min-height:100vh;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#000000 !important;padding:24px 12px;" bgcolor="#000000" class="pad-outer">
<tr><td align="center">
<table role="presentation" width="100%" style="max-width:520px;background-color:#0F0F0F !important;border-radius:4px;overflow:hidden;border:1px solid #262626;" cellpadding="0" cellspacing="0" bgcolor="#0F0F0F">
<tr><td style="padding:24px 24px;border-bottom:1px solid #F5F5F5;background-color:#0F0F0F !important;" bgcolor="#0F0F0F" class="pad-header">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td style="background-color:transparent;"><h1 style="margin:0;font-size:20px;font-weight:700;color:#FFFFFF !important;background-color:transparent;line-height:1.3;letter-spacing:0.04em;text-transform:uppercase;" class="title-font">OSCURO <span style="color:#B0B0B0 !important;">TINTZ</span></h1>
<p style="margin:6px 0 0 0;font-size:13px;color:#9E9E9E !important;background-color:transparent;">Your new booking</p></td>
<td align="right" valign="top" style="background-color:transparent;white-space:nowrap;"><span style="display:inline-block;background-color:#F5F5F5 !important;color:#000000 !important;font-size:11px;font-weight:600;text-transform:uppercase;padding:6px 12px;border-radius:2px;white-space:nowrap;letter-spacing:0.08em;" class="badge-nowrap">New Booking</span></td>
</tr></table>
</td></tr>
<tr><td style="padding:24px 24px;background-color:#0F0F0F !important;" bgcolor="#0F0F0F" class="pad-inner">
<p style="margin:0 0 16px 0;font-size:15px;color:#F5F5F5 !important;background-color:transparent;">Hey Juan, here&#39;s your latest booking.</p>
${params.manualCreationRequired ? `<div style="margin:0 0 20px 0;padding:14px 16px;background-color:#3A1A1A !important;border:1px solid #7A3030;border-radius:2px;" bgcolor="#3A1A1A">
<p style="margin:0 0 4px 0;font-size:11px;color:#FF9090 !important;text-transform:uppercase;letter-spacing:0.06em;background-color:transparent;font-weight:600;">Action Required</p>
<p style="margin:0;font-size:14px;color:#F5F5F5 !important;background-color:transparent;line-height:1.5;">This appointment was <strong>not</strong> automatically created in Square. Please add it to your calendar manually.</p></div>` : ''}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
${row('Date & Time', escapeHtml(startTime))}
${row('Customer', escapeHtml(`${params.firstName} ${params.lastName}`))}
${row('Email', escapeHtml(params.email))}
${row('Phone', escapeHtml(params.phone))}
${row('Vehicle', escapeHtml(vehicleStr || 'Not provided'))}
${row('Body style', escapeHtml(params.vehicleBody || 'Not provided'))}
${row('Service', escapeHtml(params.serviceName))}
${row('Rear window', escapeHtml(params.rearGlassLabel))}
${row('Location', escapeHtml(params.serviceLocation))}
${row('Starting price', priceStr)}
${row('Est. duration', `${params.durationHours} hrs`)}
${row('Deposit', params.depositCollected ? '$30.00 collected' : 'Not collected')}
</table>
${params.notes?.trim() ? `<div style="margin-top:20px;padding:16px;background-color:#171717 !important;border:1px solid #262626;border-radius:2px;" bgcolor="#171717">
<p style="margin:0 0 8px 0;font-size:12px;color:#9E9E9E !important;background-color:transparent;text-transform:uppercase;letter-spacing:0.06em;">Notes</p>
<p style="margin:0;font-size:15px;color:#F5F5F5 !important;background-color:transparent;line-height:1.5;white-space:pre-wrap;">${escapeHtml(params.notes.trim())}</p></div>` : ''}
<p style="margin:20px 0 0 0;font-size:12px;color:#9E9E9E !important;background-color:transparent;line-height:1.5;">Final pricing depends on the vehicle and the windows being tinted. Send a confirmed quote back to the customer.</p>
</td></tr>
<tr><td style="padding:16px 24px;background-color:#000000 !important;border-top:1px solid #262626;" bgcolor="#000000" class="pad-footer">
<p style="margin:0;font-size:13px;color:#757575 !important;background-color:transparent;text-align:center;"><a href="https://www.oscurotintz.com" style="color:#F5F5F5 !important;text-decoration:none;">oscurotintz.com</a></p>
</td></tr>
</table></td></tr></table>
</div>
</body></html>`.trim();
}

export async function POST(request: NextRequest) {
  if (!process.env.SQUARE_ACCESS_TOKEN || !process.env.SQUARE_LOCATION_ID) {
    return NextResponse.json({ error: 'Square API is not configured' }, { status: 503 });
  }

  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      serviceKey,
      rearGlass,
      vehicleYear,
      vehicleMake,
      vehicleModel,
      vehicleBody,
      serviceLocation,
      notes,
      startAt,
      serviceVariationVersion,
      teamMemberId,
      paymentToken,
      serviceKeys,
    } = body as {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      serviceKey?: string;
      rearGlass?: RearGlass;
      vehicleYear?: string;
      vehicleMake?: string;
      vehicleModel?: string;
      vehicleBody?: string;
      serviceLocation?: string;
      notes?: string;
      startAt?: string;
      serviceVariationVersion?: string | number;
      teamMemberId?: string;
      paymentToken?: string;
      serviceKeys?: string[];
    };

    if (!serviceKey || !startAt || !serviceVariationVersion || !teamMemberId) {
      return NextResponse.json({ error: 'Missing required booking fields' }, { status: 400 });
    }

    if (!paymentToken) {
      return NextResponse.json({ error: 'Payment is required to hold your appointment.' }, { status: 400 });
    }

    const service = SERVICES[serviceKey as ServiceKey];
    if (!service) {
      return NextResponse.json({ error: 'Unknown service key' }, { status: 400 });
    }

    // Build combined name + total duration from all selected services.
    const allKeys = (serviceKeys ?? [serviceKey]) as ServiceKey[];
    const allServices = allKeys.map((k) => SERVICES[k]).filter(Boolean);
    const combinedServiceName = allServices.map((s) => s.name).join(' + ');
    const totalDurationHours = allServices.reduce((sum, s) => sum + s.durationHours, 0);
    const totalStartPrice = allServices.reduce((sum, s) => sum + s.startPrice, 0);

    const variationId = resolveVariationId(serviceKey);
    if (!variationId) {
      return NextResponse.json({ error: 'Could not resolve service variation' }, { status: 400 });
    }

    // Charge $30 deposit before creating the booking.
    const DEPOSIT_CENTS = 3000n;
    let paymentId: string | null = null;
    try {
      const paymentResponse = await square.payments.create({
        sourceId: paymentToken,
        idempotencyKey: randomUUID(),
        amountMoney: {
          amount: DEPOSIT_CENTS,
          currency: 'USD',
        },
        locationId: process.env.SQUARE_LOCATION_ID,
        note: `$30 booking deposit - ${combinedServiceName}`,
      });
      paymentId = paymentResponse.payment?.id ?? null;
    } catch (payErr: unknown) {
      console.error('Deposit payment failed:', payErr);
      const sqErr = payErr as { errors?: { detail?: string }[] };
      const detail = sqErr.errors?.[0]?.detail || 'Payment failed. Please check your card and try again.';
      return NextResponse.json({ error: detail }, { status: 400 });
    }

    const anyHasRear = allServices.some((s) => s.hasRear);
    const rearGlassLabel = anyHasRear
      ? REAR_GLASS_LABEL[(rearGlass ?? 'standard') as RearGlass]
      : 'N/A';

    // Try Square customer + booking writes. If the subscription doesn't
    // support writes we fall back to email-only notification.
    let squareBookingId: string | null = null;
    let manualCreationRequired = false;

    try {
      // Find or create customer
      const searchResponse = await square.customers.search({
        query: { filter: { emailAddress: { exact: email ?? '' } } },
      });

      let customerId: string;
      if (searchResponse.customers && searchResponse.customers.length > 0) {
        customerId = searchResponse.customers[0].id!;
      } else {
        const createResponse = await square.customers.create({
          idempotencyKey: `customer-${email ?? randomUUID()}`,
          givenName:    firstName,
          familyName:   lastName,
          emailAddress: email,
          phoneNumber:  phone,
        });
        customerId = createResponse.customer!.id!;
      }

      const noteLines = [
        `SERVICE: ${combinedServiceName}`,
        `VEHICLE: ${[vehicleYear, vehicleMake, vehicleModel].filter(Boolean).join(' ') || 'Not provided'}`,
        `BODY STYLE: ${vehicleBody || 'Not provided'}`,
        `REAR WINDOW: ${rearGlassLabel}`,
        `LOCATION: ${serviceLocation || 'Not provided'}`,
        `STARTING PRICE: ${totalStartPrice > 0 ? `$${totalStartPrice}` : 'To be confirmed'}`,
        `EST. DURATION: ${totalDurationHours} hrs`,
        ...(notes?.trim() ? [`NOTES: ${notes.trim()}`] : []),
      ];

      const bookingResponse = await square.bookings.create({
        idempotencyKey: randomUUID(),
        booking: {
          startAt,
          locationId: process.env.SQUARE_LOCATION_ID,
          customerId,
          customerNote: noteLines.join('\n'),
          appointmentSegments: [{
            teamMemberId,
            serviceVariationId:      variationId,
            serviceVariationVersion: BigInt(serviceVariationVersion),
            durationMinutes:         Math.round(totalDurationHours * 60),
          }],
        },
      });
      squareBookingId = bookingResponse.booking?.id ?? null;
    } catch (squareWriteErr: unknown) {
      const sqErr = squareWriteErr as { errors?: { detail?: string }[] };
      const detail = sqErr.errors?.[0]?.detail ?? '';
      if (detail.includes('write operation') || detail.includes('subscription')) {
        console.warn('Square write blocked (subscription limit), falling back to email-only:', detail);
        manualCreationRequired = true;
      } else {
        throw squareWriteErr;
      }
    }

    // Notify the shop via email.
    const notifyEmail = process.env.BOOKING_NOTIFY_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'Bookings <bookings@oscurotintz.com>';
    if (notifyEmail && process.env.RESEND_API_KEY) {
      try {
        const html = buildBookingEmailHtml({
          startAt,
          firstName: firstName ?? '',
          lastName: lastName ?? '',
          email: email ?? '',
          phone: phone ?? '',
          vehicleYear: vehicleYear ?? '',
          vehicleMake: vehicleMake ?? '',
          vehicleModel: vehicleModel ?? '',
          vehicleBody: vehicleBody ?? '',
          serviceName: combinedServiceName,
          rearGlassLabel,
          serviceLocation: serviceLocation ?? '',
          notes: notes ?? '',
          startingPrice: totalStartPrice,
          durationHours: String(totalDurationHours),
          depositCollected: !!paymentId,
          manualCreationRequired,
        });
        await resend.emails.send({
          from: fromEmail,
          to: notifyEmail,
          subject: manualCreationRequired
            ? 'New booking (manual entry needed)'
            : 'You have a new booking',
          html,
        });
      } catch (emailErr) {
        console.error('Booking email failed:', emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      booking: {
        id:      squareBookingId ?? randomUUID().slice(0, 8).toUpperCase(),
        startAt,
        status:  manualCreationRequired ? 'PENDING_MANUAL' : 'ACCEPTED',
      },
    });
  } catch (err: unknown) {
    console.error('Booking creation error:', err);

    const squareErr = err as { errors?: { code?: string; detail?: string }[]; statusCode?: number };
    const detail = squareErr.errors?.[0]?.detail || 'Failed to create booking';
    const code   = squareErr.errors?.[0]?.code   || 'UNKNOWN';

    return NextResponse.json(
      { error: detail, code },
      { status: squareErr.statusCode || 500 },
    );
  }
}
