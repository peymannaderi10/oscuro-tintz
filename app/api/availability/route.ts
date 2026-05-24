import { NextRequest, NextResponse } from 'next/server';
import { square, defaultVariationId, serializeBigInts } from '@/lib/square';
import type { SegmentFilter } from 'square';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const serviceKey = searchParams.get('service');
  const startDate  = searchParams.get('startDate');
  const endDate    = searchParams.get('endDate');

  if (!serviceKey || !startDate || !endDate) {
    return NextResponse.json(
      { error: 'Missing service, startDate, or endDate parameter' },
      { status: 400 },
    );
  }

  if (!process.env.SQUARE_ACCESS_TOKEN || !process.env.SQUARE_LOCATION_ID) {
    return NextResponse.json({ error: 'Square API is not configured' }, { status: 503 });
  }

  const serviceVariationId = defaultVariationId(serviceKey);
  if (!serviceVariationId) {
    return NextResponse.json({ error: 'Invalid service key' }, { status: 400 });
  }

  try {
    // Square requires a UTC range. Anchor the window around US Pacific
    // business hours so we don't ask for slots before the shop opens.
    let startAt = `${startDate}T14:00:00.000Z`;
    const now = new Date();
    if (new Date(startAt) < now) startAt = now.toISOString();

    const end = new Date(`${endDate}T14:00:00.000Z`);
    end.setUTCHours(end.getUTCHours() + 15);
    const endAt = end.toISOString();

    if (new Date(startAt) >= new Date(endAt)) {
      return NextResponse.json({ availabilities: [] });
    }

    const segmentFilter: SegmentFilter = { serviceVariationId };

    const teamMemberId = searchParams.get('teamMember');
    if (teamMemberId) {
      segmentFilter.teamMemberIdFilter = { any: [teamMemberId] };
    }

    const response = await square.bookings.searchAvailability({
      query: {
        filter: {
          startAtRange: { startAt, endAt },
          locationId: process.env.SQUARE_LOCATION_ID,
          segmentFilters: [segmentFilter],
        },
      },
    });

    const safeData = serializeBigInts(response.availabilities ?? []);
    return NextResponse.json({ availabilities: safeData });
  } catch (err: unknown) {
    const msg =
      err instanceof Error ? err.message : 'Failed to fetch availability';
    console.error('Square availability error:', err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
