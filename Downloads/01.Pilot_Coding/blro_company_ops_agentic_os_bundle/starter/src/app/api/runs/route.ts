import { NextResponse } from "next/server"; import { runs } from "@/server/mock-data"; export async function GET(){return NextResponse.json({ok:true,data:runs,error:null})}
